-- Fix composite aqi views (made up of more than one pollutant, so most)
-- Problem was that the aqi for each individual pollutant was returned, instead of the max. There actually would be
-- something more complicated if we implemented NowCast and midpoint-hourly since you have to select the right one
-- and fall back to the right type if one doesn't exist.

create or replace view aqi_view as
select loc_id, device_id, timestamp, max(aqi) as val
from raw_hourly_aqi
where type = 'RAW' -- TODO: It should somehow prefer MIDPOINT over RAW, if MIDPOINT exists, or NOWCAST for the current hour
group by timestamp, device_id, loc_id
order by timestamp desc, loc_id;

create or replace view aqi_o3_pm_view as
select loc_id, device_id, timestamp, max(aqi) as val
from raw_hourly_aqi
where type = 'RAW' -- TODO: It should somehow prefer MIDPOINT over RAW, if MIDPOINT exists, or NOWCAST for the current hour
  and pollutant_id in (select pollutant_id from pollutant p where p.name = any (array ['O3', 'PM2_5', 'PM10']))
group by timestamp, device_id, loc_id
order by timestamp desc, loc_id;
