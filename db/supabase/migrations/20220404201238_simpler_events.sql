create schema event;
alter schema event owner to postgres;
grant create, usage on schema event to postgres;
grant usage on schema event to authenticated;
grant create, usage on schema event to dashboard_user;
grant usage on schema event to service_role;

alter table event
  set schema event;

alter table event.event
  rename column id to event_id;

alter table event.event
  rename column raw_event to data;

alter table event.event
  alter column data
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


create or replace function event.emit(type text, profile_id uuid, event_data jsonb, at timestamp default now())
  returns int as
$$
declare
  new_event_id int;
begin
  insert into event.event (type, profile_id, time, data)
  values (emit.type, emit.profile_id, at, event_data)
  returning event_id into new_event_id;

  case type
    when 'EVENT' then raise notice 'Got % event', type;
    else raise notice 'Implement event action for %', type;
    end case;

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