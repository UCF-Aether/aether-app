create schema alert;
alter schema alert owner to postgres;
grant create, usage on schema alert to postgres;
grant usage on schema alert to authenticated;
grant create, usage on schema alert to dashboard_user;
grant usage on schema alert to service_role;

create type alert.filter as
(
  device_id int,
  geog geography(point),
  within float
);

create table alert.definition
(
  definition_id int generated always as identity,
  name          text,
  device_id     int not null,
  profile_id    uuid not null,
  fid           int  not null, -- foreign id - sensor_chan_id or pollutant_id
  source        text,          -- reading (public.reading) or aqi (public.raw_hourly_aqi)
  trigger       float
);

create or replace function alert.test_filter (filter alert.filter, to_test alert.filter)
returns bool as $$
begin
  -- TODO: test distance with meters
  return (filter.device_id is null or filter.device_id = to_test.device_id)
     and (filter.geog is null or filter.geog <-> to_test.geog <= filter.within);
end;
$$ language plpgsql;

create or replace function alert.test_filters (filters alert.filter[], to_test alert.filter)
  returns bool as $$
declare
  f alert.filter;
begin
    foreach f in array filters
      loop
        if not alert.test_filter(f, to_test) then
          return false;
        end if;
      end loop;

    return true;
end;
$$ language plpgsql;


create or replace function alert.post(pid uuid, source text, trigger_val float, value float, did int)
  returns jsonb
  security definer
as
$$
declare
  profile_email text;
  ret           json;
  device_name   text default '';
begin
  select email
  from auth.users
  where id = pid
  into profile_email;

  if profile_email is null then raise exception 'Profile % does not exist', pid; end if;

  select name
  from device
  where device_id = did
  into device_name;

  select into ret send_email_message(
                      jsonb_build_object(
                          'sender', 'alerts@aethersensor.network',
                          'recipient', profile_email,
                          'subject', 'Trigger alert for ' || source,
                          'html_body',
                          'Your trigger for ' || device_name || ' (' || source || ') was activated at value=' ||
                          value || ', trigger=' || trigger_val
                        ));

  return ret;
end;
$$ language plpgsql volatile
                    parallel safe;

revoke execute on function alert.post from public;

create or replace function alert.get_triggered(src text, foreign_id int, val float, to_test alert.filter default null)
  returns setof alert.definition as
$$
select *
from alert.definition
where source = src
  and fid = foreign_id
  and trigger <= val
  and device_id = to_test.device_id;
--   and (to_test is null or alert.test_filters(filters, to_test))
$$ language sql immutable
                parallel safe;

create or replace function alert.try_trigger_for(src text, foreign_id int, val float, to_test alert.filter default null)
  returns void as
$$
declare
  alert_def alert.definition;
  body      jsonb;
  ret       jsonb;
begin
  for alert_def in
    select *
    from alert.get_triggered(src, foreign_id, val, to_test)
    loop
      body := jsonb_build_object(
          'profile_id', alert_def.profile_id,
          'device_id', alert_def.device_id,
          'source', src,
          'fid', foreign_id,
          'trigger_val', alert_def.trigger,
          'val', val
        );
      raise notice 'Sending email for %, source=%, fid=%, trigger=%, value=%',
        alert_def.profile_id, src, alert_def.fid, alert_def.trigger, val;
      perform event.emit('alert_triggered', alert_def.profile_id, body, alert_def.definition_id);
      begin
        -- For now, just call it manually
        select into ret alert.post(alert_def.profile_id, 'reading', alert_def.trigger, val, alert_def.device_id);
      exception
        when others then
          raise notice 'Failed to send email for % - skipping - response=%, exception=%', alert_def.profile_id, ret, sqlerrm;
      end;
    end loop;
end;
$$ language plpgsql volatile
                    parallel safe;


create or replace function alert.new(pid uuid, src text, foreign_id int, trigger_val float)
  returns int as
$$
insert into alert.definition (profile_id, source, fid, trigger)
values (pid, src, foreign_id, trigger_val)
returning definition_id;
$$ language sql;

-- Register event type
select event.create_type('alert_triggered', false);

-- I know this would probably be done better in a trigger, but I'm experimenting
create or replace function handle_trigger_event(pid uuid, body jsonb, at timestamp)
  returns void
  stable
  parallel safe as
$$
declare
  alert_def_id int;
  trig_val     float;
  source       float;
begin
  alert_def_id := body ->> 'definition_id';
  trig_val := body ->> 'trigger';
  source := body ->> 'source';
end;
$$ language plpgsql;
