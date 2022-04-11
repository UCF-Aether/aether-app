
create or replace view public.alerts as
  select ad.definition_id as alert_id,
         ad.name,
         ad.fkeys,
         "trigger",
         last_triggered_at,
         times_triggered,
         created_at,
         ad.description
  from alert.definition ad
  join device d on ad.device_id = d.device_id;
