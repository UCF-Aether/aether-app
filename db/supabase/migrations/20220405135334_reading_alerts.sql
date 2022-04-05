create or replace function check_if_reading_alert_triggered()
  returns trigger as
$$
declare
  geog geography(point);
begin
  raise notice 'Checking if alerts have been triggered chan_id=%, val=%', new.sensor_chan_id, new.val;
  select l.loc_geog
  from location l
  where l.loc_id = new.loc_id
  into geog;

  perform alert.try_trigger_for('reading', new.sensor_chan_id, new.val, (new.device_id, geog, 0));
  return new;
end;
$$ language plpgsql;


create trigger check_for_reading_alerts
  after insert
  on public.reading
  for each row
execute function check_if_reading_alert_triggered();