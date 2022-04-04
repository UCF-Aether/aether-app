create type simple_reading as
(
    timestamp timestamp,
    device_id int,
    chan_id   int,
    val       double precision
);

create type binned_reading as
(
    loc_id   int,
    lat      float,
    lng      float,
    readings simple_reading[]
);

create or replace function bin_search_readings(
    start timestamp default '2000-01-01',
    lng_min float default -180,
    lat_min float default -90,
    lng_max float default 90,
    lat_max float default 180,
    chan text default null)
    returns setof binned_reading as
$$
declare
    chan_id int;
begin
    if chan is not null then
        select sensor_chan_id
        from sensor_chan
        where name = chan
        into chan_id;
    end if;

    return query
        select loc_id,
               st_x(loc_geog::geometry) as lng,
               st_y(loc_geog::geometry) as lat,
               readings.readings_array  as readings
        from location
                 join (
            select loc_id, array_agg(row (taken_at, device_id, sensor_chan_id, val)::simple_reading) as readings_array
            from reading
            where taken_at >= start
              and case
                      when chan is not null then
                              sensor_chan_id = chan_id
                      else
                          true
                end
            group by loc_id
        ) as readings using (loc_id)
        where loc_geog && st_makeenvelope(lng_min, lat_min, lng_max, lat_max, 4326);
end;
$$
    language plpgsql stable parallel safe;
