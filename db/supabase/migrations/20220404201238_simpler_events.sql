create schema event;
alter schema event owner to postgres;
grant create, usage on schema event to postgres;
grant usage on schema event to authenticated;
grant create, usage on schema event to dashboard_user;
grant usage on schema event to service_role;

create table event.type
(
  id smallint generated always as identity,
  name text not null unique,
  callback text, -- [schema].<function name>(uuid, jsonb, timestamp)
    -- callback(profile_id uuid, event_data jsonb, at timestamp default now())
  check (name = lower(name))
);

alter table event.type
  enable row level security;

create policy event_type_read_only
  on event.type
  for select using (true);

insert into event.type (name, callback)
values
  ('device_uplink', null),
  ('device_downlink', null),
  ('device_config', null),
  ('alert_triggered', 'event.post_alert');

alter table event
  set schema event;

alter table event.event
  rename column id to event_id;

alter table event.event
  rename column raw_event to body;

alter table event.event
  alter column body
    set default '{}'::jsonb;

alter table event.event
  add column fid int;

alter table event.event
  enable row level security;

create policy user_events_policy
  on event.event
  for all using (auth.uid() = profile_id);

delete
from event.event;
alter table event.event
  add column type text not null;

drop table public.node_event;

drop table public.alert_event;


create or replace function event.emit(event_type text, profile_id uuid, event_body jsonb, at timestamp default now())
  returns int as
$$
declare
  new_event_id int;
  cb text default null;
begin
  insert into event.event (type, profile_id, time, body)
  values (event_type, emit.profile_id, at, event_body)
  returning event_id into new_event_id;

  select callback
  from event.type
  where name = event_type
  into cb;

  if cb is not null then
    execute 'select ' || cb || '($1, $2, $3)' using profile_id, event_body, at;
  end if;

  return new_event_id;
end;
$$ language plpgsql;


create view public.triggered_alerts as
  select *
  from event.event
  where type = 'alert_triggered';

create view public.device_uplinks as
  select *
  from event.event
  where type = 'device_uplink';

create view public.node_events as
  select *
  from event.event
  where type = any(array[
    'device_uplink',
    'device_downlink',
    'device_config'
    ]);

create view public.events as
  select *
  from event.event;

create or replace function event.post_alert(profile_id uuid, event jsonb, at timestamp)
returns void as $$
begin
  raise warning 'Sending alert! uid=%, at=%, body=%', profile_id, at, event;
end;
$$ language plpgsql;