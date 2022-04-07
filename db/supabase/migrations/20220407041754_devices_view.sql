create or replace view devices as
select device.device_id,
       name,
       dev_eui,
       st_x(loc_geog::geometry) as lng,
       st_y(loc_geog::geometry) as lat,
       loc_updated_at,
       last_downlink_at,
       last_uplink_at,
       created_at
from device
       left join device_meta dm on device.device_id = dm.device_id
       left join location l on dm.loc_id = l.loc_id;