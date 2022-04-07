-- Layers just collate everything you can query about sensor readings/aqi along with descriptions, how to create alerts, etc
create table layer
(
  layer_id    int primary key generated always as identity,
  name        text   not null unique,
  description text default '',
  tv_ref      text   not null, -- table-view reference for viewing data [schema].<table/view name>
  fkeys      text[] not null, -- foreign keys belonging to this layer
  trig_source text   not null
);

create or replace function create_alert(layer_name text, alert_name text, pid uuid, did int, val float)
  returns void as
$$
insert into alert.definition (name, device_id, profile_id, fkeys, source, trigger)
select alert_name, did, pid, layer.fkeys, trig_source, val
from layer
where name = layer_name;
$$ language sql;

insert into layer (name, tv_ref, fkeys, trig_source)
values ('REL_HUMIDITY', 'rel_humidity_view', '{"REL_HUMIDITY"}', 'reading'),
       ('TEMPERATURE', 'temperature_view', '{"TEMPERATURE"}', 'reading'),
       ('PRESSURE', 'pressure_view', '{"PRESSURE"}', 'reading'),
       ('CO2', 'co2_view', '{"CO2"}', 'reading'),
       ('VOC', 'voc_view', '{"VOC"}', 'reading'),
       ('O3', 'o3_view', '{"O3"}', 'reading'),
       ('NO2', 'no2_view', '{"NO2"}', 'reading'),
       ('PM2_5', 'pm2_5_view', '{"PM2_5"}', 'reading'),
       ('PM10', 'pm10_view', '{"PM10"}', 'reading'),
       ('AQI', 'aqi_view', '{"O3", "PM2_5", "PM10", "SO", "NO"}', 'aqi'),
       ('AQI_O3', 'aqi_o3_view', '{"O3"}', 'aqi'),
       ('AQI_O3_PM', 'aqi_o3_pm_view', '{"O3", "PM2_5", "PM10"}', 'aqi'),
       ('AQI_PM2_5', 'aqi_pm2_5_view', '{"PM2_5"}', 'aqi'),
       ('AQI_PM10', 'aqi_pm10_view', '{"PM10"}', 'aqi');

create type layer_data as
(
  loc_id int,
  device_id int,
  timestamp timestamp,
  val       double precision
);

create type binned_layer_data as
(
  lat  float,
  lng  float,
  data layer_data[]
);

create type contexted_binned_layer_data as
(
  trig_source text,
  layer_data  binned_layer_data[]
);


create type lat_lon_pair as
(
  lat float,
  lng float
);

create or replace function get_layer_tv(ref text)
returns setof layer_data as $$
$$ language plpgsql;


-- Get info about layers, including data
create or replace function get_layer_data(
  layer_name text,
  beginning_at timestamp default now() - interval '7 days'
) returns jsonb as
$$
declare
  _tv_ref      text;
  _trig_source text;
  ret jsonb;
begin
  select tv_ref, trig_source
  from layer
  where name = layer_name
  into strict _tv_ref, _trig_source;

  execute ('
    select jsonb_build_object(
      ''locations'', jsonb_object_agg(loc_id,  row(st_y(loc_geog::geometry), st_x(loc_geog::geometry))::lat_lon_pair),
      ''data'', array_agg(row(loc_id, device_id, timestamp, val)::layer_data order by timestamp)
      )
    from ' || _tv_ref || '
           join location using (loc_id)
    where timestamp >= $1
    limit 5000
  ') into ret using beginning_at;

  return ret;

exception
  when no_data_found then
    raise exception 'Layer % does not exist!', layer_name;
end;
$$ language plpgsql;


drop view if exists hourly_o3;
drop view if exists hourly_pm2_5;
drop view if exists hourly_pm10;

create or replace function private.create_reading_layer_view(chan text)
  returns void as
$$
begin
  execute ('
  create view public.' || lower(chan) || '_view(timestamp, val, device_id, loc_id) as
  SELECT ''1hr''::interval * hr.hour::double precision + hr.day AS "timestamp",
         hr.avg                                               AS val,
         hr.device_id,
         hr.loc_id
  FROM hourly_reading_stats hr
  WHERE hr.chan_id = get_sensor_chan_id(''' || chan || ''');
    ');
end;
$$ language plpgsql;

create or replace function private.create_aqi_layer_view(chan text)
  returns void as
$$
begin
  execute ('
  create view public.' || lower(chan) || '_view(timestamp, val, device_id, loc_id) as
  SELECT ''1hr''::interval * hr.hour::double precision + hr.day AS "timestamp",
         hr.avg                                               AS val,
         hr.device_id,
         hr.loc_id
  FROM hourly_reading_stats hr
  WHERE hr.chan_id = get_sensor_chan_id(''' || chan || ''');
    ');
end;
$$ language plpgsql;


select private.create_reading_layer_view('O3');
select private.create_reading_layer_view('PM2_5');
select private.create_reading_layer_view('PM10');
select private.create_reading_layer_view('NO2');
select private.create_reading_layer_view('VOC');
select private.create_reading_layer_view('REL_HUMIDITY');
select private.create_reading_layer_view('TEMPERATURE');
select private.create_reading_layer_view('PRESSURE');

create view public.aqi_view (timestamp, val, device_id, loc_id) as
select timestamp,
       aqi as val,
       loc_id,
       device_id
from hourly_aqi;

create view public.aqi_o3_pm_view (timestamp, val, device_id, loc_id) as
select timestamp,
       aqi as val,
       loc_id,
       device_id
from hourly_aqi
where pollutant_id in (
  select pollutant_id
  from pollutant
  where name = any (array ['O3', 'PM2_5', 'PM10']));

create view public.aqi_o3_view (timestamp, val, device_id, loc_id) as
select timestamp,
       aqi as val,
       loc_id,
       device_id
from hourly_aqi
where pollutant_id in (
  select pollutant_id
  from pollutant
  where name = 'O3');

create view public.aqi_pm2_5_view (timestamp, val, device_id, loc_id) as
select timestamp,
       aqi as val,
       loc_id,
       device_id
from hourly_aqi
where pollutant_id in (
  select pollutant_id
  from pollutant
  where name = 'PM2_5');

create view public.aqi_pm10_view (timestamp, val, device_id, loc_id) as
select timestamp,
       aqi as val,
       loc_id,
       device_id
from hourly_aqi
where pollutant_id in (
  select pollutant_id
  from pollutant
  where name = 'PM10');
