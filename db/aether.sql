begin;
create extension if not exists postgis;
set time zone 'UTC';

create type device_loc_method as enum ('GW_APPROX', 'MANUAL');
create type gateway_loc_method as enum ('GPS', 'MANUAL');
create type user_alert_method as enum ('SMS', 'EMAIL');

create table location
(
  loc_id   integer generated always as identity primary key,
  loc_geog geography(point) not null
);
create index location_gist on location using gist (loc_geog);

create table device
(
  device_id     integer generated always as identity primary key,
  user_id       uuid         not null references auth.users (id),
  name          varchar(64)  not null,
  aws_device_id varchar(128) not null unique
);
create index device_user_id on device (user_id);

create table device_meta
(
  device_id        integer primary key references device (device_id),
  created_at       timestamptz default now(),
  updated_at       timestamptz default now(),
  loc_id           integer references location (loc_id),
  loc_updated_at   timestamptz,
  loc_method       device_loc_method,
  loc_accuracy     real,
  last_uplink_at   timestamptz,
  last_downlink_at timestamptz
);

create table gateway
(
  gateway_id     integer generated always as identity primary key,
  user_id        uuid         not null references auth.users (id),
  name           varchar(64)  not null,
  aws_gateway_id varchar(128) not null unique
);
create index gateway_user_id on gateway (user_id);

create table gateway_meta
(
  gateway_id       integer primary key references gateway,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now(),
  loc_id           integer references location (loc_id),
  loc_updated_at   timestamptz,
  loc_method       gateway_loc_method,
  loc_accuracy     real,
  last_uplink_at   timestamptz,
  last_downlink_at timestamptz
);

create table sensor_chan
(
  sensor_chan_id smallint generated always as identity primary key,
  name           varchar(64) unique,
  units          varchar(16),
  check (upper(name) = name)
);

create table reading
(
  reading_id     integer generated always as identity primary key,
  device_id      integer references device (device_id),
  loc_id         integer references location (loc_id),
  sensor_chan_id smallint references sensor_chan (sensor_chan_id),
  taken_at       timestamptz      not null,
  received_at    timestamptz default now(),
  val            double precision not null
);
create index reading_taken_at on reading (taken_at);
create index reading_device_id on reading (device_id);
create index sensor_chan_id on reading (sensor_chan_id);

create table phy_sensor
(
  phy_sensor_id integer generated always as identity primary key,
  device_id     integer references device,
  sensor_key    varchar(32),
  config        json,
  state         json
);
create index phy_sensor_device_id on phy_sensor (device_id);

create table alert_def
(
  alert_def_id   integer generated always as identity primary key,
  user_id        uuid references auth.users (id),
  sensor_chan_id smallint references sensor_chan (sensor_chan_id),
  trigger_val    double precision,
  alert_method   user_alert_method,
  alert_to       varchar(96)
);

insert into sensor_chan (name, units)
values ('REL_HUMIDITY', 'PERCENT'),
       ('TEMPERATURE', 'DEG_CELSIUS'),
       ('AQI', 'NONE'),
       ('IAQ', 'NONE'),
       ('PRESSURE', 'PA'),
       ('GAS_ESTIMATE_1', 'PERCENT'),
       ('GAS_ESTIMATE_2', 'PERCENT'),
       ('GAS_ESTIMATE_3', 'PERCENT'),
       ('GAS_ESTIMATE_4', 'PERCENT'),
       ('CO2', 'PPM'),
       ('VOC', 'PPB'),
       ('PM1.0', 'UG/M^3'),
       ('PM2.5', 'UG/M^3'),
       ('PM4.0', 'UG/M^3'),
       ('PM10', 'UG/M^3'),
       ('O3', 'PPB'),
       ('NO2', 'PPB'),
       ('GAS_RES', 'OHM');

create or replace function create_device_meta_trigger()
  returns trigger
as
$$
begin
  insert into device_meta (device_id) values (new.device_id);
  return null;
end;
$$
  language plpgsql;

create or replace function create_gateway_meta_trigger()
  returns trigger
as
$$
begin
  insert into gateway_meta (gateway_id) values (new.gateway_id);
  return null;
end;
$$
  language plpgsql;

create trigger device_insert_create_meta_trigger
  after insert
  on device
  for each row
execute procedure create_device_meta_trigger();

create trigger gateway_insert_create_meta_trigger
  after insert
  on gateway
  for each row
execute procedure create_gateway_meta_trigger();

create or replace function update_loc_updated_at()
  returns trigger
  language plpgsql
as
$$
begin
  new.loc_updated_at := current_timestamp;
  return new;
end;
$$;

create or replace function updated_at_trigger()
  returns trigger
  language plpgsql
as
$$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$;


create trigger device_meta_loc_updated_at_trigger
  before update
  on device_meta
  for each row
  when (old.loc_id is distinct from new.loc_id)
execute procedure update_loc_updated_at();

create trigger device_meta_loc_updated_at_trigger
  before update
  on gateway_meta
  for each row
  when (old.loc_id is distinct from new.loc_id)
execute procedure update_loc_updated_at();

create trigger device_meta_updated_at
  before update
  on device_meta
  for each row
execute procedure updated_at_trigger();

create trigger device_meta_updated_at
  before update
  on gateway_meta
  for each row
execute procedure updated_at_trigger();

create or replace view reading_by_chan as
select reading_id,
       device_id,
       loc_id,
       taken_at,
       received_at,
       val,
       name  as chan_name,
       units as chan_units
from reading
       join sensor_chan on reading.sensor_chan_id = sensor_chan.sensor_chan_id;

create type reading_w_loc as
(
  reading_id  integer,
  device_id   integer,
  taken_at    timestamptz,
  received_at timestamptz,
  val         double precision,
  geog        geography(point),
  chan        varchar(64),
  units       varchar(16)
);

create or replace function reading_within(start_at timestamptz default '-infinity',
                                          end_at timestamptz default 'infinity',
                                          center_lon float default 0.0,
                                          center_lat float default 0.0,
                                          radius double precision default 'infinity')
  returns setof reading_w_loc
  language plpgsql
as
$$
begin
  return query
    select r.reading_id,
           r.device_id,
           r.taken_at,
           r.received_at,
           r.val,
           l.loc_geog,
           r.chan_name,
           r.chan_units
    from reading_by_chan r
           join location l on r.loc_id = l.loc_id
    where start_at <= r.taken_at
      and end_at >= r.taken_at
      and st_dwithin(l.loc_geog, st_makepoint(center_lon, center_lat), radius)
    order by r.taken_at;
end;
$$
  stable;

commit;