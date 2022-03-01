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

$$;

create or replace function create_random_readings(for_profile uuid, loc geography(point), radius float, num integer)
  returns void
  language sql
as
$$
insert into reading (device_id, loc_id, sensor_chan_id, taken_at, val)
select device_id,
       generate_random_location(st_x(loc::geometry), st_y(loc::geometry), radius),
       (select sensor_chan_id from sensor_chan where sensor_chan.name = 'AQI'),
       now(),
       69
from generate_series(1, num)
       cross join lateral (select * from device where profile_id = for_profile) as d;
$$;

create or replace function create_random_test_data()
  returns trigger
  language plpgsql
as
$$
begin
  perform create_random_devices(new.profile_id, 100);
  perform create_random_readings(new.profile_id, st_makepoint(28.611644, -81.209604), 15, 100);
  return new;
end;
$$;

create trigger create_test_data_trigger
  after insert
  on profile
  for each row
  execute procedure create_random_test_data();

commit;