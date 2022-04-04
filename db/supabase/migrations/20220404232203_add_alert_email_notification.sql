create schema alert;
alter schema alert owner to postgres;
grant create, usage on schema alert to postgres;
grant usage on schema alert to authenticated;
grant create, usage on schema alert to dashboard_user;
grant usage on schema alert to service_role;

create or replace function alert.post(pid uuid, def_id int, value float)
  returns void
  security definer
as
$$
declare
  profile_email text;
  sensor text;
  trig_val float;
  chan_id int;
begin
  select email
  from public.profile
  where profile_id = pid
  into profile_email;

  select trigger_val, sensor_chan_id
  from public.alert_def
  where alert_def_id = def_id
  into trig_val, chan_id;

  select name
  from public.sensor_chan
  where sensor_chan_id = chan_id
  into sensor;

  select send_email_message(json_build_object(
    'sender', 'aethersensor.network',
    'recipient', profile_email,
    'subject', 'Trigger alert for ' || sensor,
    'html_body', 'Your trigger for % was activated at value=%, trigger=%', sensor, value, trig_val
    ));

end;
$$ language plpgsql;

revoke execute on function alert.post from public;
