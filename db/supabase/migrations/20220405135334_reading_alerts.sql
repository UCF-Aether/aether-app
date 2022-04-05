create or replace function check_if_reading_alert_triggered()
  returns trigger as
$$
declare
begin
  raise notice 'Checking if alerts have been triggered chan_id=%, val=%', new.sensor_chan_id, new.val;
  perform alert.try_trigger_for('reading', new.sensor_chan_id, new.val);
  return new;
end;
$$ language plpgsql;


create trigger check_for_alerts
  after insert
  on public.reading
  for each row
execute function check_if_reading_alert_triggered();