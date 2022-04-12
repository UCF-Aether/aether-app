alter table public.raw_hourly_aqi
 drop constraint raw_hourly_aqi_day_hour_pollutant_id_loc_id_device_id_type_key;

alter table public.raw_hourly_aqi
  add primary key (hour, day, pollutant_id, loc_id, type);