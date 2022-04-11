create or replace function create_device(device_name text, device_eui text, lng float default 0, lat float default 0)
returns int as
$$
declare
  dev_id int;
  location_id int;
begin
  insert into public.device (profile_id, name, dev_eui)
  values (auth.uid(), device_name, device_eui)
  returning device_id into dev_id;

  insert into location (loc_geog)
  values (st_makepoint(lng, lat)::geography)
  returning loc_id into location_id;

  update public.device_meta
    set loc_id = location_id
  where device_id = dev_id;

  return dev_id;
end;

$$ language plpgsql;
