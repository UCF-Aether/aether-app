create table hourly_reading_stats
(
  reading_stats_id int generated always as identity not null,
  device_id        int references device (device_id) not null,
  loc_id           int references location (loc_id) not null,
  chan_id          int references sensor_chan (sensor_chan_id) not null,
  hour             smallint    default extract(hour from now()),
  day              date        default date_trunc('day', now())::date,
  cur_time         timestamptz default now(),
  sum              double precision not null,
  count            int         default 1,
  max              double precision,
  min              double precision,
  avg              double precision generated always as ( sum / count ) stored,
  primary key (loc_id, hour, day, chan_id),
  unique (day, hour, chan_id, loc_id)
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
  avg,
  device_id,
  loc_id
from
  hourly_reading_stats
where
  chan_id = get_sensor_chan_id('O3');

create or replace view hourly_pm2_5 as
select
  hour,
  day,
  chan_id,
  avg,
  device_id,
  loc_id
from
  hourly_reading_stats
where
  chan_id = get_sensor_chan_id('PM2_5');

create or replace view hourly_pm10 as
select
  hour,
  day,
  chan_id,
  avg,
  device_id,
  loc_id
from
  hourly_reading_stats
where
  chan_id = get_sensor_chan_id('PM10');


create table pollutant
(
  pollutant_id smallint primary key generated always as identity,
  name         text unique,
  trunc_amt    smallint not null
);

create table pollutant_subindex
(
  pollutant_subindex_id int primary key generated always as identity,
  pol                   text not null references pollutant (name),
  timeframe_hours       int not null,
  aqi_low               smallint not null,
  aqi_high              smallint not null,
  conc_low              double precision not null,
  conc_high             double precision not null,
  advisory_statement    text default '',
  unique (pol, timeframe_hours, aqi_low, aqi_high),
  constraint positive_timeframe check ( timeframe_hours >= 0 )
);

-- Assumes conc has been truncated
create or replace function get_pollutant_subindex(pollutant text, for_timeframe_hours int, conc double precision)
  returns pollutant_subindex
  language sql
as
$$
select *
from
  pollutant_subindex
where
    conc_low <= conc
and conc_high >= conc
and pol = pollutant
and timeframe_hours = for_timeframe_hours;
$$;

create or replace function conc_to_aqi(pollutant text, for_timeframe_hours int, conc double precision)
  returns int
  language plpgsql
as
$$
declare
  trunc_conc double precision;
  aqi int;
begin
  select
    trunc(conc::numeric, pm.trunc_amt)
  from
    pollutant pm
  where
    pm.name = pollutant
  into
    trunc_conc;

  select
      aqi_low + (aqi_high - aqi_low) * (trunc_conc - conc_low) / (conc_high - conc_low)
  from
    get_pollutant_subindex(pollutant, for_timeframe_hours, trunc_conc)
  into aqi;

  return aqi;
end;
$$;

create table hourly_aqi
(
  hourly_aqi_id   int generated always as identity,
  device_id       int references device (device_id),
  loc_id          int references location (loc_id),
  pollutant_id    smallint references pollutant (pollutant_id),
  hour            int,
  day             date,
  aqi             smallint,
  timeframe_hours smallint
);

create index on hourly_aqi (day, hour, pollutant_id, loc_id);

create or replace function update_hourly_aqi()
  returns trigger
  language sql
as
$$
$$;

create trigger update_hourly_aqi_trigger
  before insert
  on hourly_reading_stats
  for each row
execute procedure update_hourly_aqi();
