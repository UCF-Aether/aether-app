create schema event;
alter schema event owner to postgres;
grant create, usage on schema event to postgres;
grant usage on schema event to authenticated;
grant create, usage on schema event to dashboard_user;
grant usage on schema event to service_role;

create table event.type
(
  type_id         smallint primary key generated always as identity,
  name            text not null unique,
  require_staging bool default false
    check (name = lower(name))
);

alter table event.type
  enable row level security;

grant references, select, trigger on event.type to anon;
grant references, select, trigger on event.type to authenticated;
grant references, select, trigger on event.type to service_role;

create policy event_type_read_only
  on event.type
  for select using (true);

insert into event.type (name, require_staging)
values ('device_uplink', false),
       ('device_uplink_error', false),
       ('device_downlink', false),
       ('device_config', false);

create table event.committed
(
  event_id    int generated always as identity,
  profile_id  uuid references public.profile (profile_id),
  commited_at timestamp default now(),
  created_at  timestamp default now(),
  body        jsonb,
  fid         int,
  type        text
);

alter table event.committed
  enable row level security;

create policy user_events_policy
  on event.committed
  for all using (auth.uid() = profile_id);

create index on event.committed (commited_at, profile_id);

grant references, select, trigger on event.committed to anon;
grant references, select, trigger, insert, update, delete on event.committed to authenticated;
grant references, select, trigger, insert, update, delete on event.committed to service_role;

create table event.staging
(
  staged_event_id int generated always as identity,
  profile_id      uuid,
  time            timestamp,
  body            jsonb,
  fid             int,
  type            text
);

alter table event.staging
  enable row level security;

create policy user_staging_events_policy
  on event.committed
  for all using (auth.uid() = profile_id);

grant references, select, trigger on event.staging to anon;
grant references, select, trigger, insert, update, delete on event.staging to authenticated;
grant references, select, trigger, insert, update, delete on event.staging to service_role;

create table event.listener
(
  listener_id   int generated always as identity,
  event_type_id int references event.type (type_id),
  callback      text -- [schema].<function name>(uuid, jsonb, timestamp)
  -- callback(profile_id uuid, event_data jsonb, at timestamp default now())
);

create index on event.staging (time, profile_id);


create or replace function event.commit(staged_id int)
  returns int as
$$
declare
  new_event_id int;
begin
  insert into event.committed (profile_id, created_at, body, fid, type, commited_at)
  select profile_id, time, body, fid, type, now()
  from event.staging
  where staged_event_id = staged_id
  returning event_id into new_event_id;

  delete
  from event.staging
  where staged_event_id = staged_id;

  return new_event_id;
end;
$$ language plpgsql;

create or replace function event.create_type (type_name text, stage bool)
returns int as
$$
  insert into event.type (name, require_staging)
  values (type_name, stage)
  returning type_id;
$$ language sql;

create or replace function event.listen_to (event_type text, cb text)
returns void as $$
insert into event.listener (event_type_id, callback)
select type_id, cb
from event.type
where name = event_type;
$$ language sql;

create or replace function event.emit(
  event_type text,
  profile_id uuid,
  event_body jsonb,
  foreign_id int default null,
  at timestamp default now())
  returns void as
$$
declare
  cb          text;
  cbs         text[] default null;
  stage_event bool;

begin
  select lst.callbacks, require_staging
  from event.type t
         left join (
    select array_agg(callback) as callbacks, event_type_id as type_id
    from event.listener
    group by event_type_id
  ) as lst using (type_id)
  where name = event_type
  into cbs, stage_event;

  raise notice '%', stage_event;
  if stage_event then
    insert into event.staging (profile_id, time, body, fid, type)
    values (emit.profile_id, at, event_body, foreign_id, event_type);
  else
    if cbs is not null then
      foreach cb in array cbs
        loop
          execute 'select ' || cb || '($1, $2, $3)' using profile_id, event_body, at;
        end loop;
    end if;

    insert into event.committed (profile_id, created_at, body, fid, type)
    values (emit.profile_id, at, event_body, foreign_id, event_type);
  end if;
end;
$$ language plpgsql volatile;


create view public.triggered_alerts as
select *
from event.committed
where type = 'alert_triggered';

create view public.device_uplinks as
select *
from event.committed
where type = 'device_uplink';

create view public.node_events as
select *
from event.committed
where type = any (array [
  'device_uplink',
  'device_downlink',
  'device_config'
  ]);

create view public.events as
select *
from event.committed;