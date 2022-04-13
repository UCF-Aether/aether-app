
create or replace view raw_no2_view as
  select loc_id,
         device_id,
         taken_at::timestamp as timestamp,
         val
  from reading
  where sensor_chan_id = get_sensor_chan_id('NO2');

create or replace view raw_o3_view as
select loc_id,
       device_id,
       taken_at::timestamp as timestamp,
       val
from reading
where sensor_chan_id = get_sensor_chan_id('O3');

create or replace view raw_pm2_5_view as
select loc_id,
       device_id,
       taken_at::timestamp as timestamp,
       val
from reading
where sensor_chan_id = get_sensor_chan_id('PM2_5');

create or replace view raw_pm10_view as
select loc_id,
       device_id,
       taken_at::timestamp as timestamp,
       val
from reading
where sensor_chan_id = get_sensor_chan_id('PM10');

create or replace view raw_rel_humidity_view as
select loc_id,
       device_id,
       taken_at::timestamp as timestamp,
       val
from reading
where sensor_chan_id = get_sensor_chan_id('REL_HUMIDITY');

create or replace view raw_temperature_view as
select loc_id,
       device_id,
       taken_at::timestamp as timestamp,
       val
from reading
where sensor_chan_id = get_sensor_chan_id('TEMPERATURE');


insert into layer.definition (name, description, tv_ref, fkeys, trig_source)
values
       ('RAW_NO2', 'Raw NO2', 'raw_no2_view', '{"NO2"}', 'reading'),
       ('RAW_O3', 'Raw O3', 'raw_o3_view','{"O3"}', 'reading'),
       ('RAW_PM2_5', 'Raw PM 2.5', 'raw_pm2_5_view', '{"PM2_5"}', 'reading'),
       ('RAW_PM10', 'Raw PM 10', 'raw_pm10_view', '{"PM10"}', 'reading'),
       ('RAW_REL_HUMIDITY', 'Raw relative humidity', 'raw_rel_humidity_view', '{"REL_HUMIDITY"}', 'reading'),
       ('RAW_TEMPERATURE', 'Raw temperature', 'raw_temperature', '{"TEMPERATURE"}', 'reading');
