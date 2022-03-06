begin;

-- Insert some sensor channels we will support
insert into sensor_chan (name, units)
values ('REL_HUMIDITY', 'PERCENT'),
       ('TEMPERATURE', 'DEG_CELSIUS'),
       ('AQI', 'NONE'),
       ('IAQ', 'NONE'),
       ('PRESSURE', 'PA'),
       ('GAS_ESTIMATE_1', 'PERCENT'),
       ('GAS_ESTIMATE_2', 'PERCENT'),
       ('GAS_ESTIMATE_3', 'PERCENT'),
       ('GAS_ESTIMATE_4', 'PERCENT'),
       ('CO2', 'PPM'),
       ('VOC', 'PPB'),
       ('PM1.0', 'UG/M^3'),
       ('PM2.5', 'UG/M^3'),
       ('PM4.0', 'UG/M^3'),
       ('PM10', 'UG/M^3'),
       ('O3', 'PPB'),
       ('NO2', 'PPB'),
       ('GAS_RES', 'OHM');

commit;
