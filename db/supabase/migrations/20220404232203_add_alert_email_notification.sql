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
  sensor        text;
  trig_val      float;
  ret           json;
begin
  select email
  from public.profile p
  join auth.users u on u.id = p.profile_id
  where profile_id = pid
  into profile_email;

  select trigger_val, sc.name
  from public.alert_def
         join sensor_chan sc on sc.sensor_chan_id = alert_def.sensor_chan_id
  where alert_def_id = def_id
  into trig_val, sensor;

  select into ret
    send_email_message(
    jsonb_build_object(
      'sender', 'alerts@aethersensor.network',
      'recipient', profile_email,
      'subject', 'Trigger alert for ' || sensor,
      'html_body', 'Your trigger for '|| sensor || ' was activated at value='|| value ||', trigger=' || trig_val
    ));
end;
$$ language plpgsql;

revoke execute on function alert.post from public;
