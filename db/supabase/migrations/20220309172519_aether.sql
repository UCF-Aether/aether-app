begin;
create extension if not exists postgis;
set time zone 'UTC';

create type device_loc_method as enum ('GW_APPROX', 'MANUAL');
create type gateway_loc_method as enum ('GPS', 'MANUAL');
create type user_alert_method as enum ('SMS', 'EMAIL');

-- Allow postgraphile to augment user credentials
do
$$
  declare
    rec record;
  begin
    select
      oid,
      rolname
    into rec
    from
      pg_roles
    where
        pg_has_role('postgres', oid, 'member')
    and rolname = 'authenticated';
    if not found then
      grant authenticated to postgres;
    end if;
  end;
$$
language plpgsql;


------------------------------------------
--
-- Profile
--
------------------------------------------
create table profile
(
  profile_id uuid primary key references auth.users (id),
  first_name text default '',
  last_name  text default ''
);
alter table profile
  enable row level security;
create policy "Only the account holder can update their profile"
  on profile for update using (
  auth.uid() = profile_id
  );
create policy "Only the account holder can view their profile"
  on profile for select using (
  auth.uid() = profile_id
  );

-- Create profile when there's a new user in auth.users
create function handle_new_user()
  returns trigger
  language plpgsql
  security definer set search_path = public
as
$$
begin
  insert into profile (profile_id)
  values (new.id);
  return new;
end;
$$;

-- Trigger for creating profile on user creation
create trigger on_auth_user_created
  after insert
  on auth.users
  for each row
execute procedure public.handle_new_user();

------------------------------------------
--
-- Location
--
------------------------------------------
create table location
(
  loc_id   integer generated always as identity primary key,
  loc_geog geography(point) not null
);
create index location_gist on location using gist (loc_geog);
alter table location
  enable row level security;
create policy "Anyone can insert locations"
  on location for insert with check (
  true
  );
create policy "Anyone can read locations"
  on location for select using (
  true
  );

------------------------------------------
--
-- Common device and gateway functions
--
------------------------------------------
-- Generic function to update the loc_updated_at column to now()
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

-- Generic function to update the updated_at column to now()
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

create or replace function generate_eui()
  returns text
  language sql
as
$$
SELECT
  array_to_string(
      array(select
              substr('ABCDEF0123456789', ((random() * (16 - 1) + 1)::integer), 1)
            from
              generate_series(1, 16)), '');
$$;

------------------------------------------
--
-- Device
--
------------------------------------------
create type lorawan_activation_method as enum ('OTAA', 'ABP');
create table device
(
  device_id         integer generated always as identity primary key,
  profile_id        uuid not null references profile (profile_id),
  name              varchar(64) not null,
  dev_eui           char(16) not null unique,
  app_skey          char(32),
  app_key           char(32),
  nwk_skey          char(32),
  app_eui           char(16),
  activation_method lorawan_activation_method,
  aws_device_id     varchar(128) not null unique,
  bme_config        json default '{}'::json,
  bme_state         json default '{}'::json
);
create index device_profile_id on device (profile_id);
create index device_deveui on device (dev_eui);
alter table device
  enable row level security;

create or replace function get_device_owner(req_device_id integer)
  returns uuid
as
$$
select
  profile_id
from
  device
where
  device_id = req_device_id
$$
  language sql;

create policy "Only owners can use their own devices"
  on device for select using (
  device.profile_id = auth.uid()
  );

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
alter table device_meta
  enable row level security;
create policy "Users can modify their own device's config"
  on device_meta for update using (
  auth.uid() = get_device_owner(device_id)
  );

create policy "Users can read their own device's config"
  on device_meta for select using (
  auth.uid() = get_device_owner(device_id)
  );

create policy "Only owners can use their own device metadata"
  on device_meta for all using (
  get_device_owner(device_id) = auth.uid()
  );

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

create trigger device_insert_create_meta_trigger
  after insert
  on device
  for each row
execute procedure create_device_meta_trigger();

-- Update timestamp if the device meta location column is updated
create trigger device_meta_loc_updated_at_trigger
  before update
  on device_meta
  for each row
  when (old.loc_id is distinct from new.loc_id)
execute procedure update_loc_updated_at();

-- Update timestamp if the device meta is updated
create trigger device_meta_updated_at
  before update
  on device_meta
  for each row
execute procedure updated_at_trigger();

create or replace function get_device_location(id integer)
  returns location
  language sql
as
$$
select *
from
  location
where
    loc_id = (
    select
      loc_id
    from
      device_meta
    where
      device_meta.device_id = id
  );
$$;

-- Functions don't do string length matching - casts char(n) to char(1) for some odd reason?
create or replace function device_by_deveui(lookup_dev_eui text)
  returns device
  language sql
as
$$
select *
from
  device
where
  device.dev_eui = lookup_dev_eui;
$$;
------------------------------------------
--
-- Gateway
--
------------------------------------------
create table gateway
(
  gateway_id     integer generated always as identity primary key,
  profile_id     uuid not null references profile (profile_id),
  name           varchar(64) not null,
  aws_gateway_id varchar(128) not null unique
);
create index gateway_profile_id on gateway (profile_id);
alter table gateway
  enable row level security;

create or replace function get_gateway_owner(req_gateway_id integer)
  returns uuid
as
$$
begin
  return (
    select
      profile_id
    from
      gateway
    where
      gateway_id = req_gateway_id
  );
end;
$$
  language plpgsql;

create policy "Only owners can use their own gateways"
  on gateway for all using (
  get_gateway_owner(gateway_id) = auth.uid()
  );

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
alter table gateway_meta
  enable row level security;

create policy "Only owners can use their own gateway metadata"
  on gateway_meta for all using (
  get_gateway_owner(gateway_id) = auth.uid()
  );

-- Create meta row for gateway when a new gateway is created
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

-- Trigger for creating new meta row for the new gateway
create trigger gateway_insert_create_meta_trigger
  after insert
  on gateway
  for each row
execute procedure create_gateway_meta_trigger();

-- Update timestamp if the gateway meta location column is updated
create trigger gateway_meta_loc_updated_at_trigger
  before update
  on gateway_meta
  for each row
  when (old.loc_id is distinct from new.loc_id)
execute procedure update_loc_updated_at();

-- Update timestamp if the gateway meta is updated
create trigger gateway_meta_updated_at
  before update
  on gateway_meta
  for each row
execute procedure updated_at_trigger();


------------------------------------------
--
-- Sensors and readings
--
------------------------------------------
create table sensor_chan
(
  sensor_chan_id smallint generated always as identity primary key,
  name           varchar(64) unique,
  units          varchar(16),
  check (upper(name) = name)
);
alter table sensor_chan
  enable row level security;
create policy "Only admins can update sensor_chan"
  on sensor_chan for all using (false);

-- Insert some sensor channels we will support
delete from sensor_chan;
insert into
  sensor_chan (name, units)
values
  ('REL_HUMIDITY', 'percent'),
  ('TEMPERATURE', 'deg_celsius'),
  ('AQI', 'none'),
  ('FAST_AQI', 'none'),
  ('PRESSURE', 'Pa'),
  ('GAS_ESTIMATE_1', 'percent'),
  ('GAS_ESTIMATE_2', 'percent'),
  ('GAS_ESTIMATE_3', 'percent'),
  ('GAS_ESTIMATE_4', 'percent'),
  ('CO2', 'ppm'),
  ('VOC', 'ppb'),
  ('PM1_0', 'ug/m^3'),
  ('PM2_5', 'ug/m^3'),
  ('PM4_0', 'ug/m^3'),
  ('PM10', 'ug/m^3'),
  ('O3', 'ppb'),
  ('NO2', 'ppb'),
  ('GAS_RES', 'ohm');

create table reading
(
  reading_id     integer generated always as identity primary key,
  device_id      integer references device (device_id) not null,
  loc_id         integer references location (loc_id) not null,
  sensor_chan_id smallint references sensor_chan (sensor_chan_id) not null,
  taken_at       timestamptz not null,
  received_at    timestamptz default now(),
  val            double precision not null
);
create index reading_taken_at on reading (taken_at);
create index reading_device_id on reading (device_id);
create index sensor_chan_id on reading (sensor_chan_id);
alter table reading
  enable row level security;
create policy "Allow unauthenticated reads"
  on reading for select using (true);

-- create or replace function set_reading_loc_to_device_loc()
--   returns trigger
--   language plpgsql
-- as
-- $$
-- begin
--   new.loc_id := (select loc_id from get_device_location(new.device_id));
--   return new;
-- end;
-- $$;
--
-- create trigger updating_reading_loc
--   before insert
--   on reading
--   for each row
-- execute procedure set_reading_loc_to_device_loc();

-- create table phy_sensor
-- (
--   phy_sensor_id integer generated always as identity primary key,
--   device_id     integer references device (device_id),
--   sensor_key    varchar(32),
--   config        json,
--   state         json
-- );
-- create index phy_sensor_device_id on phy_sensor (device_id);
-- alter table phy_sensor
--   enable row level security;
--
-- create policy "Only owners can use their own sensors"
--   on phy_sensor for all using (
--   get_device_owner(device_id) = auth.uid()
--   );

-- Join of reading sensor_chan for convenience
create or replace view reading_by_chan as
select
  reading_id,
  device_id,
  loc_geog as geog,
  taken_at,
  received_at,
  val,
  name     as chan_name,
  units    as chan_units
from
  reading
    join sensor_chan on reading.sensor_chan_id = sensor_chan.sensor_chan_id
    join location on reading.loc_id = location.loc_id;

-- Join of reading_by_chan and location for doing different types of filtering, like within <radius> or within a time range.
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

create or replace function new_reading(dev_eui text, sensor_channel text, at timestamptz,
                                       value double precision)
  returns reading
  language sql as
$$
with
  dev as (select * from device_by_deveui(dev_eui))
insert
into
  reading (device_id, loc_id, sensor_chan_id, taken_at, received_at, val)
values
  ((select device_id from dev),
   (select loc_id from get_device_location((select device_id from dev))),
   (select sensor_chan_id from sensor_chan where sensor_chan.name = sensor_channel),
   at,
   now(),
   value)
returning *;
$$;

-- Find readings within various metrics - defaults shouldn't affect results i.e. return everything besides arguments passed.
create or replace function readings_within(start_at timestamptz default '-infinity',
                                           end_at timestamptz default 'infinity',
                                           center_lon float default 0.0,
                                           center_lat float default 0.0,
                                           radius double precision default 'infinity',
                                           chan text default '')
  returns setof reading_w_loc
  language sql
as
$$
select
  r.reading_id,
  r.device_id,
  r.taken_at,
  r.received_at,
  r.val,
  r.geog,
  r.chan_name,
  r.chan_units
from
  reading_by_chan r
where
    start_at <= r.taken_at
and end_at >= r.taken_at
and st_dwithin(r.geog, st_makepoint(center_lon, center_lat), radius)
and case when chan != '' then r.chan_name = chan else true end
order by
  r.taken_at;
$$
  stable;

------------------------------------------
--
-- Alerts
--
------------------------------------------
create table alert_def
(
  alert_def_id   integer generated always as identity primary key,
  profile_id     uuid not null references profile (profile_id),
  sensor_chan_id smallint references sensor_chan (sensor_chan_id),
  trigger_val    double precision,
  alert_method   user_alert_method,
  alert_to       varchar(96)
);
create index alert_def_profile_id on alert_def (profile_id);
create index alert_def_sensor_chan_id on alert_def (sensor_chan_id);

alter table alert_def
  enable row level security;
create policy "Only users can use their own alerts"
  on alert_def for all using (
  auth.uid() = profile_id
  );

------------------------------------------
--
-- Events
--
------------------------------------------
create type link_direction as enum ('DOWNLINK', 'UPLINK');
create type node_loc_method as enum ('MANUAL', 'GPS', 'GW_APPROX');
create table event
(
  id         integer generated always as identity primary key,
  profile_id uuid references profile (profile_id),
  time       timestamptz default now(),
  raw_event  json
);
alter table event
  enable row level security;
create policy "Users can see their own events"
  on event for select using (
  auth.uid() = profile_id
  );


create table node_event
(
  device_id       integer references device (device_id),
  gateway_id      integer references gateway (gateway_id),
  link_dir        link_direction,
  device_rf_meta  json,
  gateway_rf_meta json,
  loc_id          integer references location (loc_id),
  loc_method      node_loc_method,
  reading_id      integer references reading (reading_id)
) inherits (event);
alter table node_event
  enable row level security;
create policy "Users can see their own node events"
  on node_event for select using (
  auth.uid() = profile_id
  );

create table alert_event
(
  reading_id   integer references reading (reading_id),
  alert_def_id integer references alert_def (alert_def_id)
) inherits (event);
alter table node_event
  enable row level security;
create policy "Users can see their own alert events"
  on alert_event for select using (
  auth.uid() = profile_id
  );

-- TODO: create triggers to add to event table
------------------------------------------
--
-- Other functions
--
------------------------------------------
create or replace function generate_random_point(lat float, lng float, radius float)
  returns geography(point)
  language sql
as
$$
select
  st_makepoint(
        lat + random() * radius,
        lng + random() * radius
    );
$$;

create or replace function generate_random_location(lat float, lng float, radius float)
  returns integer
  language sql
as
$$
insert into
  location (loc_geog)
values
  (generate_random_point(lat, lng, radius))
returning loc_id;
$$;

create or replace function random_time(last_days integer)
  returns timestamptz
  language sql
as
$$
select now() + (interval '1 minute' * 1440 * last_days * random());
$$;
------------------------------------------
--
-- Other triggers
--
------------------------------------------

------------------------------------------
--
-- Other policies
--
------------------------------------------
-- postgis creates an unprotected spatial_ref_sys table
-- alter table spatial_ref_sys
--   enable row level security;
-- create policy "Allow spatial_ref_sys reads"
-- on public.spatial_ref_sys using (true);

commit;
