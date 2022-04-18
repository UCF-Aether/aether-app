create or replace function update_device_location(did int, lat float, lng float)
  returns int as $$
declare
  new_loc_id int;
begin
  insert into location (loc_geog)
  values (st_makepoint(lng, lat)::geography)
  returning loc_id into new_loc_id;

  update device_meta
  set loc_id = new_loc_id
  where device_id = did;

  return new_loc_id;
end;
$$ language plpgsql;
