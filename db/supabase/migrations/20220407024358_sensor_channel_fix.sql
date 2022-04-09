drop policy "Only admins can update sensor_chan"
on public.sensor_chan;

create policy sensor_chan_readonly
on sensor_chan
for select
using (true);