create table hourly_reading_stats
(
  device_id int references device (device_id) not null,
  loc_id    int references location (loc_id) not null,
  chan_id   int references sensor_chan (sensor_chan_id) not null,
  hour      smallint    default extract(hour from now()),
  day       date        default date_trunc('day', now())::date,
  cur_time  timestamptz default now(),
  sum       double precision not null,
  count     int         default 1,
  max       double precision,
  min       double precision,
  avg       double precision generated always as ( sum / count ) stored,
  primary key (day, hour, chan_id, loc_id)
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
  on conflict (loc_id, hour, day, chan_id) do update
    set
      cur_time = now(),
      sum = excluded.sum + hourly_reading_stats.sum,
      count = hourly_reading_stats.count + 1,
      max = greatest(excluded.sum, hourly_reading_stats.max),
      min = least(excluded.sum, hourly_reading_stats.min);

  return new;
end;
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
-- TODO: handle choosing 1hr or 8hr O3 based on conc
create or replace function get_pollutant_subindex(pollutant text, conc double precision,
                                                  for_timeframe_hours int default -1)
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
and case
      when for_timeframe_hours > 0 then
        timeframe_hours = for_timeframe_hours
      when pollutant = 'O3' then
        timeframe_hours = 8
      else true end
order by
  timeframe_hours ASC
limit 1;
$$;


create or replace function conc_to_aqi(pollutant text, conc double precision, for_timeframe_hours int default -1)
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
      case
        when trunc_conc < (select min(conc_low) from pollutant_subindex where pol = pollutant) then
          0
        when trunc_conc > (select max(conc_high) from pollutant_subindex where pol = pollutant) then
          500
        else
          aqi_low + (aqi_high - aqi_low) * (trunc_conc - conc_low) / (conc_high - conc_low)
      end
  from
    get_pollutant_subindex(pollutant, trunc_conc, for_timeframe_hours)
  into aqi;

  return aqi;
end;
$$;

create type aqi_type as enum ('RAW', 'HOURLY', 'DAILY','NOWCAST');
create table hourly_aqi
(
  hourly_aqi_id int generated always as identity,
  device_id     int references device (device_id) not null,
  loc_id        int references location (loc_id) not null,
  pollutant_id  smallint references pollutant (pollutant_id) not null,
  hour          smallint not null,
  day           date not null,
  aqi           smallint not null,
  type          aqi_type not null,
  unique (day, hour, pollutant_id, loc_id, device_id, type)
);

create or replace function update_hourly_aqi()
  returns trigger
  language plpgsql
as
$$
declare
  pol_id smallint;
  pol_name text;
  new_aqi smallint;
begin
  if not new.chan_id in (
    select
      sensor_chan_id
    from
      sensor_chan sc
    where
      sc.name in ('O3', 'PM2_5', 'PM10', 'NO2', 'CO', 'SO2')) then
    raise notice 'lkdjfkdjf';
    return new;
  end if;

  select
    name
  from
    pollutant p
  where
      p.name = (select sc.name from sensor_chan sc where sc.sensor_chan_id = new.chan_id)
  into pol_name;

  select
    pollutant_id
  from
    pollutant p
  where
    p.name = pol_name
  into pol_id;

  select conc_to_aqi(pol_name, new.avg) into new_aqi;

  raise notice 'id=%', pol_id;
  insert into
    hourly_aqi (device_id, loc_id, pollutant_id, hour, day, aqi, type)
  values
    (new.device_id,
     new.loc_id,
     pol_id,
     new.hour,
     new.day,
     new_aqi,
     'RAW')
  on conflict (day, hour, pollutant_id, loc_id, device_id, type) do update
    set
      aqi = new_aqi;

  return new;
end;
$$;

create trigger insert_hourly_aqi_trigger
  after insert
  on hourly_reading_stats
  for each row
execute procedure update_hourly_aqi();

create trigger update_hourly_aqi_trigger
  after update
  on hourly_reading_stats
  for each row
execute procedure update_hourly_aqi();


-- type can be aqi_type or 'MAX'
create or replace function get_aqi(loc int, at timestamp default now(), for_type text default 'MAX')
  returns smallint
  language sql
as
$$
with
  cur_hours_aqi as (
    select *
    from
      hourly_aqi
    where
        loc_id = loc
    and hour = extract(hour from at)
    and day = date_trunc('day', at)
  )
select
  max(aqi)
from
  cur_hours_aqi
where
  case
    when for_type = 'MAX' then
      true
    else
      type = for_type::aqi_type
    end;
$$;