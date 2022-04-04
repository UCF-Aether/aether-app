create type simple_reading as
(
  timestamp timestamp,
  device_id int,
  chan      text,
  val       double precision
);

create type binned_reading as
(
  loc_id   int,
  lat      float,
  lng      float,
  readings simple_reading[]
);

create or replace function readings(
  start timestamp default null,
  lng_min float default null,
  lat_min float default null,
  lng_max float default null,
  lat_max float default null,
  chan text default null)
  returns setof binned_reading as
$$
select loc_id,
       st_x(loc_geog::geometry) as lng,
       st_y(loc_geog::geometry) as lat,
       readings.readings_array  as readings
from location
       join (
  select loc_id,
         array_agg(
             row (taken_at, device_id, sc.name, val)::simple_reading
             order by taken_at) as readings_array
  from reading rd
         join sensor_chan sc on rd.sensor_chan_id = sc.sensor_chan_id
  where (start is null or taken_at >= start)
    and (chan is null or chan = sc.name)
  group by loc_id
) as readings using (loc_id)
where (lng_min is null or loc_geog::geometry @ st_makeenvelope(lng_min, lat_min, lng_max, lat_max, 4326));
$$ language sql stable
                parallel safe;
