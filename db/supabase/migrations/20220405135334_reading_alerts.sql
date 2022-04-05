create or replace function check_if_reading_alert_triggered()
  returns trigger as
$$
declare
  alert_def alert.definition;
  body      jsonb;
  ret       jsonb;
begin
  raise notice 'Checking if alerts have been triggered chan_id=%, val=%', new.sensor_chan_id, new.val;
  for alert_def in
    select *
    from alert.get_triggered('reading', new.sensor_chan_id, new.val)
    loop
      body := jsonb_build_object(
          'profile_id', alert_def.profile_id,
          'source', 'reading',
          'fid', new.sensor_chan_id,
          'trigger_val', alert_def.trigger,
          'val', new.val
        );
      raise notice 'Sending email for %, source=%, fid=%, trigger=%, value=%', alert_def.profile_id, 'reading', alert_def.fid, alert_def.trigger, new.val;
      perform event.emit('alert_triggered', alert_def.profile_id, body, new.sensor_chan_id, new.taken_at::timestamp);
      begin
        -- For now, just call it manually
        select into ret alert.post(alert_def.profile_id, 'reading', alert_def.trigger, new.val);
      exception
        when others then
          raise notice 'Failed to send email for % - skipping - response=%, exception=%', alert_def.profile_id, ret, sqlerrm;
      end;
    end loop;

  return new;
end;
$$ language plpgsql;


create trigger check_for_alerts
  after insert
  on public.reading
  for each row
execute function check_if_reading_alert_triggered();