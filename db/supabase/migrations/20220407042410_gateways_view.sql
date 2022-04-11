create or replace view gateways as
select gw.gateway_id,
       name,
       st_x(loc_geog::geometry) as lng,
       st_y(loc_geog::geometry) as lat,
       loc_updated_at,
       last_downlink_at,
       last_uplink_at,
       created_at
from gateway gw
       left join gateway_meta gm on gw.gateway_id = gm.gateway_id
       left join location l on gm.loc_id = l.loc_id;