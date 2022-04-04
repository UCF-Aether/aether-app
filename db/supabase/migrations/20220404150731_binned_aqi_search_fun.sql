-- I really couldn't come up with a better name
create type simple_aqi as
(
  timestamp timestamp,
  device_id int,
  val       smallint
);

create type binned_aqi as
(
  loc_id int,
  lng    float,
  lat    float,
  aqi    simple_aqi[]
);


create or replace function aqi(
  start timestamp default null,
  lng_min float default null,
  lat_min float default null,
  lng_max float default null,
  lat_max float default null,
  pols text[] default null)
  returns setof binned_aqi as
$$
select loc_id,
       st_x(loc_geog::geometry) as lng,
       st_y(loc_geog::geometry) as lat,
       aqi.aqi
from location
       join(
  select loc_id,
         array_agg(
             row (timestamp, device_id, aqi)::simple_aqi
             order by timestamp ASC) as aqi
  from hourly_aqi
         left join pollutant p on hourly_aqi.pollutant_id = p.pollutant_id
  where (start is null or timestamp >= start)
    and (pols is null or p.name = any (pols))
  group by loc_id
) as aqi using (loc_id)
where (lng_min is null or loc_geog::geometry @ st_makeenvelope(lng_min, lat_min, lng_max, lat_max, 4326));
$$ language sql stable
                parallel safe;
