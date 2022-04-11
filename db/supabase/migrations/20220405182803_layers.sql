create schema layer;
grant create, usage on schema layer to postgres;
grant usage on schema layer to authenticated;
grant create, usage on schema layer to dashboard_user;
grant usage on schema layer to service_role;

-- Layers just collate everything you can query about sensor readings/aqi along with descriptions, how to create alerts, etc
create table layer.definition
(
  layer_id    int primary key generated always as identity,
  name        text   not null unique,
  description text default '',
  tv_ref      text   not null, -- table-view reference for viewing data [schema].<table/view name>
  fkeys       text[] not null, -- foreign keys belonging to this layer, can represent a combination
  trig_source text   not null
);

grant select, references on layer.definition to anon;
grant select, references on layer.definition to authenticated;
grant select, references on layer.definition to service_role;

create or replace function create_alert(layer_name text, alert_name text, did int, val float, description text default '', pid uuid default auth.uid())
  returns int as
$$
insert into alert.definition (name, description, device_id, profile_id, fname, fkeys, source, trigger)
select alert_name, create_alert.description, did, pid, layer_name, l.fkeys, trig_source, val
from layer.definition l
where name = layer_name
returning definition_id;
$$ language sql;

insert into layer.definition (name, tv_ref, fkeys, trig_source)
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

create type layer.view_data as
(
  loc_id    int,
  device_id int,
  timestamp timestamp,
  val       double precision
);

create type layer.data as
(
  device_id int,
  lng       float,
  lat       float,
  timestamp timestamp,
  val       double precision
);

create type lat_lon_pair as
(
  lat float,
  lng float
);

create or replace function layer.select_tv(view text)
  returns setof layer.view_data as
$$
declare
begin
  return query execute ('select loc_id, device_id, timestamp, val::double precision from ' || view);
end;
$$ language plpgsql;


-- Get info about layers, including data
create or replace function public.get_layer(
  layer_name text,
  start timestamp default now() - interval '7 days',
  "end" timestamp default null
)
  returns setof layer.data
  security definer as
$$
declare
  _tv_ref text;
begin
  select tv_ref
  from layer.definition
  where name = layer_name
  into strict _tv_ref;

  return query
    select device_id,
           st_x(loc_geog::geometry) as lng,
           st_y(loc_geog::geometry) as lat,
           timestamp,
           val::double precision
    from layer.select_tv(_tv_ref)
           join location using (loc_id)
    where timestamp >= start
      and ("end" is null or timestamp <= "end")
    order by timestamp;

exception
  when no_data_found then
    raise exception 'Layer % does not exist!', layer_name;
end ;
$$ language plpgsql;


drop view if exists hourly_o3;
drop view if exists hourly_pm2_5;
drop view if exists hourly_pm10;

create or replace function private.create_reading_layer_view(chan text)
  returns void as
$$
begin
  execute ('
  create or replace view public.' || lower(chan) || '_view as
  select hr.loc_id,
         hr.device_id,
         ''1hr''::interval * hr.hour::double precision + hr.day AS "timestamp",
         hr.avg                                               AS val
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

create view public.aqi_view as
select loc_id,
       device_id,
       timestamp,
       aqi as val
from hourly_aqi;

create view public.aqi_o3_pm_view as
select loc_id,
       device_id,
       timestamp,
       aqi as val
from hourly_aqi
where pollutant_id in (
  select pollutant_id
  from pollutant
  where name = any (array ['O3', 'PM2_5', 'PM10']));

create view public.aqi_o3_view as
select loc_id,
       device_id,
       timestamp,
       aqi as val
from hourly_aqi
where pollutant_id in (
  select pollutant_id
  from pollutant
  where name = 'O3');

create view public.aqi_pm2_5_view as
select loc_id,
       device_id,
       timestamp,
       aqi as val
from hourly_aqi
where pollutant_id in (
  select pollutant_id
  from pollutant
  where name = 'PM2_5');

create view public.aqi_pm10_view as
select loc_id,
       device_id,
       timestamp,
       aqi as val
from hourly_aqi
where pollutant_id in (
  select pollutant_id
  from pollutant
  where name = 'PM10');
