drop function if exists create_random_devices(for_profile uuid, num integer) cascade;
drop function if exists create_random_readings(for_profile uuid, loc geography, radius double precision, num integer, last_days integer, channel text, min_val double precision, max_val double precision) cascade;
drop function if exists create_random_test_data() cascade;
drop trigger if exists create_test_data_trigger on profile cascade;


