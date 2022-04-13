alter table device
  drop column aws_device_id;

alter table device
  alter column profile_id set default auth.uid();

create policy anyone_create_devices
on device for insert with check (true);