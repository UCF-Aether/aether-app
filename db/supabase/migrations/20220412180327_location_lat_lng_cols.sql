alter table location
  add column loc_lat float generated always as (st_y(loc_geog::geometry)) stored;

alter table location
  add column loc_lng float generated always as (st_x(loc_geog::geometry)) stored;

select * from location;