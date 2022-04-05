create schema alert;
alter schema alert owner to postgres;
grant create, usage on schema alert to postgres;
grant usage on schema alert to authenticated;
grant create, usage on schema alert to dashboard_user;
grant usage on schema alert to service_role;


create table alert.definition
(
  definition_id int generated always as identity,
  profile_id    uuid not null,
  fid           int  not null, -- foreign id - sensor_chan_id or pollutant_id
  source        text,          -- reading (public.reading) or aqi (public.raw_hourly_aqi)
  cmp_operator  text default '>=',
  trigger       float
);

create or replace function alert.post(pid uuid, source text, trigger_val float, value float)
  returns jsonb
  security definer
as
$$
declare
  profile_email text;
  ret           json;
begin
  select email
  from auth.users
  where id = pid
  into profile_email;

  if profile_email is null then raise exception 'Profile % does not exist', pid; end if;

  select into ret send_email_message(
                      jsonb_build_object(
                          'sender', 'alerts@aethersensor.network',
                          'recipient', profile_email,
                          'subject', 'Trigger alert for ' || source,
                          'html_body',
                          'Your trigger for ' || source || ' was activated at value=' || value || ', trigger=' ||
                          trigger_val
                        ));

  return ret;
end;
$$ language plpgsql volatile
                    parallel safe;

revoke execute on function alert.post from public;

create or replace function alert.get_triggered(src text, foreign_id int, val float)
  returns setof alert.definition as
$$
select *
from alert.definition
where source = src
  and fid = foreign_id
  and trigger <= val;
$$ language sql immutable
                parallel safe;

create or replace function alert.try_trigger_for(src text, foreign_id int, val float)
  returns void as
$$
declare
  alert_def alert.definition;
  body      jsonb;
  ret       jsonb;
begin
  for alert_def in
    select *
    from alert.get_triggered('reading', foreign_id, val)
    loop
      body := jsonb_build_object(
          'profile_id', alert_def.profile_id,
          'source', 'reading',
          'fid', foreign_id,
          'trigger_val', alert_def.trigger,
          'val', val
        );
      raise notice 'Sending email for %, source=%, fid=%, trigger=%, value=%',
        alert_def.profile_id, src, alert_def.fid, alert_def.trigger, val;
      perform event.emit('alert_triggered', alert_def.profile_id, body, foreign_id);
      begin
        -- For now, just call it manually
        select into ret alert.post(alert_def.profile_id, 'reading', alert_def.trigger, val);
      exception
        when others then
          raise notice 'Failed to send email for % - skipping - response=%, exception=%', alert_def.profile_id, ret, sqlerrm;
      end;
    end loop;
end;
$$ language plpgsql volatile
                    parallel safe;


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
