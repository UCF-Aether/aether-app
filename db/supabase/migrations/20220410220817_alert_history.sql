create or replace view alert_history as
select fid as definition_id,
       profile_id,
       commited_at as triggered_at,
       body -> 'fname' as layer_name,
       body -> 'device_id' as device_id,
       body -> 'fkey' as triggered_by,
       body -> 'trigger_val' as trigger_val,
       body -> 'val' as val
from event.committed
where type = 'alert_triggered'
order by triggered_at desc;