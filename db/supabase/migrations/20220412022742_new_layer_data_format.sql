drop function get_layer(layer_name text, start timestamp without time zone, "end" timestamp without time zone);

create or replace function get_layer(layer_name text, start_time timestamp without time zone DEFAULT (now() - '7 days'::interval),
                          end_time timestamp without time zone DEFAULT NULL::timestamp without time zone,
                          did int default null)
  returns jsonb
  security definer
  language plpgsql
as
$$
declare
  _tv_ref text;
  ret     jsonb;
begin
  select tv_ref
  from layer.definition
  where name = layer_name
  into strict _tv_ref;

  select jsonb_build_object(
             'locations',
             coalesce(jsonb_object_agg(loc_id, (st_y(loc_geog::geometry), st_x(loc_geog::geometry))::lat_lon_pair),
                      '{}'::jsonb),
             'readings', coalesce(jsonb_agg((loc_id, device_id, tv.timestamp, val)::layer.view_data order by tv.timestamp desc),
                                  '[]'::jsonb)
           )
  from layer.select_tv(_tv_ref) tv
         join location using (loc_id)
  where (did is null or device_id = did)
    and tv.timestamp >= start_time
    and (end_time is null or tv.timestamp <= end_time)
  into ret;

  return ret;

exception
  when no_data_found then
    raise exception 'Layer % does not exist!', layer_name;
end ;
$$;
