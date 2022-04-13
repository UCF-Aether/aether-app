create or replace view hourly_aqi as
select device_id, loc_id, pollutant_id, timestamp, type, max(aqi) as aqi
from raw_hourly_aqi
where type = 'RAW' -- TODO: It should somehow prefer MIDPOINT over RAW, if MIDPOINT exists, or NOWCAST for the current hour
group by device_id, loc_id, pollutant_id, timestamp, type
order by timestamp;
