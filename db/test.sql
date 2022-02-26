select * from auth.users;
select * from public.profile;
insert into auth.users (id, role, email) values ('00000000-0000-0000-0000-000000000000', 'authenticated', 'test@test.test');
select * from device;
insert into device (dev_eui, profile_id, name, aws_device_id, bme_config, bme_state) VALUES
(
 '0000000000000000', '00000000-0000-0000-0000-000000000000', 'Test device', '0', '{}'::json, '{}'::json
);
select * from device;

insert into location (loc_geog) values
(st_makepoint(0.0, 0.0)::geography);

update device_meta
  set  loc_id = (select loc_id from location fetch first row only),
       loc_method = 'MANUAL';
select * from device_meta;

insert into reading (device_id, sensor_chan_id, taken_at, received_at, val) VALUES
(
 (select device_id from device fetch first row only),
 (select sensor_chan_id from sensor_chan where sensor_chan.name = 'AQI'),
 now(), now(), 69.420
);

select * from reading;
select * from sensor_chan;
select * from get_device_location(2);
select * from new_reading('0000000000000000', 'O3', now(), 420.69);
select  readings_within();