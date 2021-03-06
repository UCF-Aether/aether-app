-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

create schema if not exists cayenne;

alter schema cayenne owner to postgres;
grant create, usage on schema cayenne to postgres;
grant usage on schema cayenne to anon;
grant usage on schema cayenne to authenticated;
grant create, usage on schema cayenne to dashboard_user;
grant usage on schema cayenne to service_role;

create extension if not exists plv8;

-- Type: reading

-- DROP TYPE IF EXISTS cayenne.reading cascade;
create type cayenne.reading as
(
  chan text,
  type text,
  val  double precision
);

alter type cayenne.reading
  owner to postgres;

create or replace function cayenne.decode(
  packet bytea)
  returns cayenne.reading[]
  language 'plv8'
  cost 100
  stable parallel unsafe
as
$BODY$
  let get_map = (key) => {
    let map = plv8.execute('select * from cayenne.map where key=$1', [key]);
    if (map.length === 0) plv8.elog(ERROR, 'Unknown map key: ' + JSON.stringify(key));
    return map[0];
  }
  let get_chan = (key) => {
    let chan = plv8.execute('select * from cayenne.channel where key=$1', [key]);
    if (chan.length === 0) plv8.elog(ERROR, 'Unknown chan key: ' + JSON.stringify(key));
    return chan[0];
  }

  let bytes_to_float = (bytes) => {
    if (bytes.length !== 4) plv8.elog(ERROR, 'Invalid bytes length');
    let f32 = new Float32Array(bytes.buffer);
    return f32[0];
  }

  let bytes_to_u16 = (bytes) => {
    if (bytes.length !== 2) plv8.elog(ERROR, 'Invalid bytes length');
    return (new Uint16Array(bytes.buffer))[0];
  }

  // Only supports FLOAT and U16
  let get_type_size = (t) => t === 'FLOAT' ? 4 : 2;
  let map = null;
  let chan = null;
  let bytes = new Uint8Array(packet);
  let readings = [];
  let i = 0;

  plv8.elog(NOTICE, JSON.stringify(bytes.length));
  while (i < bytes.length) {
    plv8.elog(NOTICE, JSON.stringify(bytes[i]));
    chan = get_chan(bytes[i]);
    i++;
    if (i >= bytes.length) plv8.elog(ERROR, 'Malformed packet');

    map = get_map(bytes[i]);
    i++;
    if (i >= bytes.length) plv8.elog(ERROR, 'Malformed packet');

    let decode_to = map.decode_to;
    let size = get_type_size(decode_to);
    plv8.elog(NOTICE, JSON.stringify(size));
    let data = bytes.slice(i, i + size).reverse();
    let val = decode_to === 'FLOAT' ? bytes_to_float(data) : bytes_to_u16(data);
    plv8.elog(NOTICE, JSON.stringify(val));
    readings.push({
      chan: chan.val,
      type: map.val,
      val,
    });
    i += size;
    plv8.elog(NOTICE, JSON.stringify(readings));
  }

  return readings;
$BODY$;

alter function cayenne.decode(bytea)
  owner to postgres;

create table if not exists cayenne.channel
(
  key smallint not null,
  val text collate pg_catalog."default",
  constraint channel_pkey primary key (key),
  constraint channel_val_key unique (val)
)
  tablespace pg_default;

alter table if exists cayenne.channel
  owner to postgres;

create table if not exists cayenne.map
(
  key       smallint not null,
  val       text collate pg_catalog."default",
  decode_to text collate pg_catalog."default",
  constraint map_pkey primary key (key),
  constraint map_val_key unique (val)
)
  tablespace pg_default;

alter table if exists cayenne.map
  owner to postgres;


create or replace function public.bytea_to_f32(
  data bytea)
  returns double precision
  language 'plv8'
  cost 100
  immutable parallel unsafe
as
$BODY$
 if (data.length != 4) plv8.elog(ERROR, 'Invalid data length');
 let bytes = new Uint8Array(data.slice(0, 4).reverse());
 let f32 = new Float32Array(bytes.buffer);
 return f32[0];
$BODY$;

alter function public.bytea_to_f32(bytea)
  owner to postgres;

grant execute on function public.bytea_to_f32(bytea) to public;

grant execute on function public.bytea_to_f32(bytea) to anon;

grant execute on function public.bytea_to_f32(bytea) to authenticated;

grant execute on function public.bytea_to_f32(bytea) to postgres;

grant execute on function public.bytea_to_f32(bytea) to service_role;

delete
from cayenne.map;
insert into cayenne.map (key, val, decode_to)
values (0, 'TEMPERATURE', 'FLOAT'),
       (1, 'PRESSURE', 'FLOAT'),
       (2, 'REL_HUMIDITY', 'FLOAT'),
       (3, 'GAS_RES', 'FLOAT'),
       (4, 'FAST_AQI', 'U16'),
       (5, 'AQI', 'U16'),
       (6, 'O3', 'FLOAT');

delete
from cayenne.channel;
insert into cayenne.channel (key, val)
values (0, 'BME688'),
       (1, 'ZMOD4510'),
       (2, 'SPS30');
