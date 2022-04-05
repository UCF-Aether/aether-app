create or replace function handle_lorawan_uplink(req jsonb)
  returns json
  security definer
as
$$
declare
  payload            text;
  deveui             text;
  uplink_received_at timestamp;
  readings           cayenne.reading[];
  rd                 cayenne.reading;
  row                public.reading;
  inserted           public.reading[] default '{}';
  pid                uuid;
  did                int;
begin
  payload := req -> 'uplink_message' ->> 'frm_payload';
  deveui := req -> 'end_device_ids' ->> 'dev_eui';
  uplink_received_at := req -> 'uplink_message' ->> 'received_at';

  if payload is null then raise exception 'Missing payload'; end if;
  if deveui is null then raise exception 'Missing device EUI'; end if;
  if uplink_received_at is null then raise exception 'Missing uplink_received_at'; end if;

  select profile_id, device_id
  from device
  where dev_eui = deveui
  into pid, did;

  perform event.emit('device_uplink', pid,
                     jsonb_build_object(
                         'profile_id', pid,
                         'device_id', did,
                         'payload', payload,
                         'request', req
                       ), did);
  readings = cayenne.decode(decode(payload, 'base64'));

  foreach rd in array readings
    loop
      select *
      from
        new_reading(
            deveui,
            rd.type,
            uplink_received_at,
            rd.val)
      into row;
      inserted := inserted || row;
      raise notice 'row = %', row;
      raise notice 'array = %', inserted;
    end loop;

  if array_length(inserted, 1) > 0 then
    return json_build_object('result', inserted);
  else
    perform set_config('response.status', '500', true);
    return json_build_object('error', 'No readings inserted');
  end if;
end;
$$ language plpgsql;
