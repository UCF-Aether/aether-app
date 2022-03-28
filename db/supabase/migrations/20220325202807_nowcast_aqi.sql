create table hourly_reading_stats
(
  reading_stats_id int generated always as identity not null,
  device_id        int references device (device_id) not null,
  loc_id           int references location (loc_id) not null,
  hour             int         default extract(hour from now()),
  day              date        default date_trunc('day', now())::date,
  cur_time         timestamptz default now(),
  chan_id          int references sensor_chan (sensor_chan_id) not null,
  sum              double precision not null,
  count            int         default 1,
  max              double precision,
  min              double precision,
  avg              double precision generated always as ( sum / count ) stored,
  primary key (loc_id, hour, day, chan_id),
  unique (loc_id, hour, day, chan_id)
);
create index on hourly_reading_stats (chan_id);

create or replace function update_hourly_reading_stats()
  returns trigger
  language plpgsql
as
$$
begin
  insert into
    hourly_reading_stats
    (device_id, loc_id, hour, day, chan_id, sum, max, min)
  values
    (new.device_id,
     new.loc_id,
     extract(hour from new.taken_at),
     date_trunc('day', new.taken_at)::date,
     new.sensor_chan_id,
     new.val,
     new.val,
     new.val)
  on conflict (device_id, hour, day, chan_id) do update
    set
      cur_time = now(),
      sum = excluded.sum + hourly_reading_stats.sum,
      count = hourly_reading_stats.count + 1,
      max = greatest(excluded.sum, hourly_reading_stats.max),
      min = least(excluded.sum, hourly_reading_stats.min);

  return null;
end
$$;

drop trigger if exists reading_hourly_stats_trigger on reading;
create trigger reading_hourly_stats_trigger
  before insert
  on reading
  for each row
execute procedure update_hourly_reading_stats();

-- TODO: calculate o3 nowcast function
-- TODO: calculate pm nowcast function
-- TODO: trigger on reading_averages to create/update nowcast_aqi
-- TODO: pub/sub on reading, reading_averages, nowcast_aqi

create or replace function get_sensor_chan_id(chan text)
  returns int
  language sql
as
$$
select
  sensor_chan_id
from
  sensor_chan
where
  sensor_chan.name = chan;
$$;

create or replace view hourly_o3 as
select
  hour,
  day,
  chan_id,
  avg
from
  hourly_reading_stats
where
  chan_id = get_sensor_chan_id('O3');

create or replace view hourly_pm2_5 as
select
  hour,
  day,
  chan_id,
  avg
from
  hourly_reading_stats
where
  chan_id = get_sensor_chan_id('PM2_5');

create or replace view hourly_pm10 as
select
  hour,
  day,
  chan_id,
  avg
from
  hourly_reading_stats
where
  chan_id = get_sensor_chan_id('PM10');


create or replace function o3_nowcast_surrogate_aqi (device_id int, at timestamp)
  returns double precision
  language plpgsql
as $$
begin
end
$$;

create table hourly_aqi
(
  hourly_aqi_id int generated always as identity,
  loc_id        int references location (loc_id),
  hour          int,
  day           date,
  pm2_5_aqi     double precision,
  pm10_aqi      double precision,
  o3_aqi        double precision,
  aqi           double precision generated always as ( max([pm2_5_aqi, pm10_aqi, o3_aqi]) ) stored
);

