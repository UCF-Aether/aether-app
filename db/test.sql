begin;
create or replace function create_random_devices(for_profile uuid, num integer)
  returns void
  language sql
as
$$
insert into device (profile_id, name, dev_eui, aws_device_id)
select for_profile            as profile_id,
       'Device-' || eui::text as name,
       eui                    as dev_eui,
       eui                    as aws_device_id
from (select generate_series(1, num), generate_eui() as eui) as ids;

update device_meta
  set loc_id = generate_random_location(0, 0, 180)
  where true;
$$;

create or replace function create_random_readings(
  for_profile uuid,
  loc geography(point),
  radius float,
  num integer,
  last_days integer,
  channel text,
  min_val float,
  max_val float
)
  returns void
  language sql
as
$$
insert into reading (device_id, loc_id, sensor_chan_id, taken_at, val)
select device_id,
       loc_id,
       (select sensor_chan_id from sensor_chan where sensor_chan.name = channel),
       random_time(last_days),
       min_val + random() * (max_val - min_val)
from generate_series(1, num)
       cross join lateral (
         select * from device join device_meta using (device_id) where profile_id = for_profile ) as d;
$$;

create or replace function create_random_test_data()
  returns trigger
  language plpgsql
as
$$
begin
  perform create_random_devices(new.profile_id, 100);
  perform create_random_readings(new.profile_id, st_makepoint(28.611644, -81.209604), 360, 20, -7, 'AQI', 0, 500);
  perform create_random_readings(new.profile_id, st_makepoint(28.611644, -81.209604), 360, 20, -7, 'TEMPERATURE', 0, 40);
  perform create_random_readings(new.profile_id, st_makepoint(28.611644, -81.209604), 360, 20, -7, 'REL_HUMIDITY', 0, 100);
  perform create_random_readings(new.profile_id, st_makepoint(28.611644, -81.209604), 360, 20, -7, 'O3', 0, 0.604);
  perform create_random_readings(new.profile_id, st_makepoint(28.611644, -81.209604), 360, 20, -7, 'PM10', 0, 604);
  perform create_random_readings(new.profile_id, st_makepoint(28.611644, -81.209604), 360, 20, -7, 'PM2_5', 0, 500.4);
  perform create_random_readings(new.profile_id, st_makepoint(28.611644, -81.209604), 360, 20, -7, 'VOC', 0, 100);
  return new;
end;
$$;

create trigger create_test_data_trigger
  after insert
  on profile
  for each row
execute procedure create_random_test_data();

commit;
