-- Allowable time-series data to read
create table layer
(
  layer_id int primary key generated always as identity,
  name text not null unique,
  tv_ref text not null -- table-view reference [schema].<table/view name>
);


create or replace function check_if_aqi_alert_triggered()
  returns trigger as
$$
declare
  geog geography(point);
  pollutant_name text;
begin
  raise notice 'Checking if alerts have been triggered pollutant=%, val=%', new.pollutant_id, new.aqi;
  select l.loc_geog
  from location l
  where l.loc_id = new.loc_id
  into geog;

  select name
  from pollutant
  where pollutant_id = new.pollutant_id
  into pollutant_name;

  perform alert.try_trigger_for('aqi', pollutant_name, new.aqi, (new.device_id, geog, 0));
  return new;
end;
$$ language plpgsql;


create trigger check_for_aqi_alerts
  after insert or update
  on public.raw_hourly_aqi
  for each row
execute function check_if_aqi_alert_triggered();
