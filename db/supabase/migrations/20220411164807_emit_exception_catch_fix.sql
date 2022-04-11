create or replace function emit(event_type text, profile_id uuid, event_body jsonb, foreign_id integer DEFAULT NULL::integer, at timestamp without time zone DEFAULT now()) returns void
  language plpgsql
as
$$
declare
  cb          text;
  cbs         text[] default null;
  stage_event bool;

begin
  select lst.callbacks, require_staging
  from event.type t
         left join (
    select array_agg(callback) as callbacks, event_type_id as type_id
    from event.listener
    group by event_type_id
  ) as lst using (type_id)
  where name = event_type
  into cbs, stage_event;

  raise notice '%', stage_event;
  if stage_event then
    insert into event.staging (profile_id, time, body, fid, type)
    values (emit.profile_id, at, event_body, foreign_id, event_type);
  else
    if cbs is not null then
      foreach cb in array cbs
        loop
          begin
            execute 'select ' || cb || '($1, $2, $3)' using profile_id, event_body, at;
          exception
            when others then
              raise warning 'Error processing callback: %', cb;
          end;
        end loop;
    end if;

    insert into event.committed (profile_id, created_at, body, fid, type)
    values (emit.profile_id, at, event_body, foreign_id, event_type);
  end if;
end;
$$;
