create table layer
(
  layer_id    int primary key generated always as identity,
  name        text   not null unique,
  description text default '',
--   tv_ref      text   not null, -- table-view reference for viewing data [schema].<table/view name>
  fnames      text[] not null,
  trig_source text   not null
);

create or replace function create_alert(alert_name text, pid uuid, did int, layer_name text, val float)
  returns void as
$$
insert into alert.definition (name, device_id, profile_id, fid, source, trigger)
select alert_name, did, pid, fnames, trig_source, val
from layer
where name = layer_name;
$$ language sql;

insert into layer (name, fnames, trig_source)
values ('REL_HUMIDITY', '{"REL_HUMIDITY"}', 'reading'),
       ('TEMPERATURE', '{"TEMPERATURE"}', 'reading'),
       ('PRESSURE', '{"PRESSURE"}', 'reading'),
       ('CO2', '{"CO2"}', 'reading'),
       ('VOC', '{"VOC"}', 'reading'),
       ('O3', '{"O3"}', 'reading'),
       ('NO2', '{"NO2"}', 'reading'),
       ('PM2_5', '{"PM2_5"}', 'reading'),
       ('PM10', '{"PM10"}', 'reading'),
       ('AQI_O3', '{"O3"}', 'aqi'),
       ('AQI_O3_PM', '{"O3", "PM2_5", "PM10"}', 'aqi'),
       ('AQI_PM2_5', '{"PM2_5"}', 'aqi'),
       ('AQI_PM10', '{"PM10"}', 'aqi');

select * from profile;
select * from device;
select create_alert(
  'My test alert',
  '817feee3-98a5-4602-9912-893bf8c96b8c',
  2,
  'AQI_O3_PM',
  50
  );
select * from layer;
select * from alert.definition;
-- Get info about layers, including data
-- create or replace function layers (lyrs text[], )