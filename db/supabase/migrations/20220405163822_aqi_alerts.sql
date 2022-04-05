create or replace function check_if_aqi_alert_triggered()
  returns trigger as
$$
declare
  geog geography(point);
begin
  raise notice 'Checking if alerts have been triggered pollutant=%, val=%', new.pollutant_id, new.aqi;
  select l.loc_geog
  from location l
  where l.loc_id = new.loc_id
  into geog;

  perform alert.try_trigger_for('aqi', new.pollutant_id, new.aqi, (new.device_id, geog, 0));
  return new;
end;
$$ language plpgsql;


create trigger check_for_aqi_alerts
  after insert or update
  on public.raw_hourly_aqi
  for each row
execute function check_if_aqi_alert_triggered();
