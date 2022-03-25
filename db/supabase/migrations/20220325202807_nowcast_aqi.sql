create table reading_average (
  reading_averages_id int generated always as identity not null,
  device_id int references device(device_id) not null,
  hour int not null,
  day date not null,
  chan int references sensor_chan(sensor_chan_id) not null,
  avg_1hr double precision not null
);
create index on reading_average (device_id, hour, day, chan);

-- TODO: create binning/lookup function
-- TODO: update average function
-- TODO: create new average function
-- TODO: trigger on reading to create/update averages
-- TODO: calculate o3 nowcast function
-- TODO: calculate pm nowcast function
-- TODO: trigger on reading_averages to create/update nowcast_aqi
-- TODO: pub/sub on reading, reading_averages, nowcast_aqi



create table nowcast_aqi (
   nowcast_aqi_id int generated always as identity,
   device_id int references device(device_id),
   hour int,
   day date,
   pm2_5 double precision,
   pm10 double precision,
   o3 double precision
);

