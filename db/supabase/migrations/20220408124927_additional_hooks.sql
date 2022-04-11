create or replace function device_uplink_hook(pid int, body jsonb, at timestamp)
  returns void as
$$
update public.device_meta
set last_uplink_at = at
where public.device_meta.device_id = (body -> 'device_id')::int;
$$ language sql;

select event.listen_to('device_uplink', 'public.device_uplink_hook');