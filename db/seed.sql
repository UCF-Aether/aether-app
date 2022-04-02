begin;

-- Insert some sensor channels we will support
insert into
  sensor_chan (name, units)
values
  ('REL_HUMIDITY', 'percent'),
  ('TEMPERATURE', 'deg_celsius'),
  ('AQI', 'none'),
  ('FAST_AQI', 'none'),
  ('PRESSURE', 'Pa'),
  ('GAS_ESTIMATE_1', 'percent'),
  ('GAS_ESTIMATE_2', 'percent'),
  ('GAS_ESTIMATE_3', 'percent'),
  ('GAS_ESTIMATE_4', 'percent'),
  ('CO2', 'ppm'),
  ('VOC', 'ppb'),
  ('PM1_0', 'ug/m^3'),
  ('PM2_5', 'ug/m^3'),
  ('PM4_0', 'ug/m^3'),
  ('PM10', 'ug/m^3'),
  ('O3', 'ppb'),
  ('NO2', 'ppb'),
  ('GAS_RES', 'ohm');

insert into
  pollutant (name, trunc_amt)
values
  ('O3', 3),
  ('PM2_5', 1),
  ('PM10', 0),
  ('CO', 1),
  ('SO2', 0),
  ('NO', 0);

-- Values from Table 4 from "Technical Assistance Document for the Reporting of Daily Air Quality – the Air Quality
-- Index (AQI)"
insert into
  pollutant_subindex (pol, timeframe_hours, aqi_low, aqi_high, conc_low, conc_high, advisory_statement)
values
  -- O3 8 hour
  ('O3', 8, 0, 50, 0, 0.054,
   'None.'),
  ('O3', 8, 51, 100, 0.055, 0.07,
   'Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion.'),
  ('O3', 8, 101, 150, 0.071, 0.085,
   'People with lung disease (such as asthma), children, older adults, people who are active outdoors ' ||
   '(including outdoor workers), people with certain genetic variants, and people with diets limited in certain ' ||
   'nutrients should reduce prolonged or heavy outdoor exertion.'),
  ('O3', 8, 151, 200, 0.086, 0.105,
   'People with lung disease (such as asthma), children, older adults, people who are active outdoors (including ' ||
   'outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients ' ||
   'should avoid prolonged or heavy outdoor exertion; everyone else should reduce prolonged or heavy outdoor exertion.'),
  ('O3', 8, 201, 300, 0.106, 0.2,
   'People with lung disease (such as asthma), children, older adults, people who are active outdoors (including ' ||
   'outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients ' ||
   'should avoid all outdoor exertion; everyone else should reduce outdoor exertion.'),

 -- O3 1 hour
  ('O3', 1, 100, 150, 0.125, 0.164,
   'People with lung disease (such as asthma), children, older adults, people who are active outdoors ' ||
   '(including outdoor workers), people with certain genetic variants, and people with diets limited in certain ' ||
   'nutrients should reduce prolonged or heavy outdoor exertion.'),
  ('O3', 1, 151, 200, 0.165, 0.204,
   'People with lung disease (such as asthma), children, older adults, people who are active outdoors (including ' ||
   'outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients ' ||
   'should avoid prolonged or heavy outdoor exertion; everyone else should reduce prolonged or heavy outdoor exertion.'),
  ('O3', 1, 201, 300, 0.205, 0.404,
   'People with lung disease (such as asthma), children, older adults, people who are active outdoors (including ' ||
   'outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients ' ||
   'should avoid prolonged or heavy outdoor exertion; everyone else should reduce prolonged or heavy outdoor exertion.'),
  ('O3', 1, 301, 500, 0.405, 0.604,
   'Everyone should avoid all outdoor exertion.'),

  -- PM2.5 24 hour
  ('PM2_5', 24, 0, 50, 0, 12,
   'None.'),
  ('PM2_5', 24, 51, 100, 12.1, 35.4,
   'Unusually sensitive people should consider reducing prolonged or heavy exertion.'),
  ('PM2_5', 24, 101, 150, 35.5, 55.4,
   'People with heart or lung disease, older adults, children, and people of lower socioeconomic status should ' ||
   'reduce prolonged or heavy exertion.'),
  ('PM2_5', 24, 151, 200, 55.5, 150.4,
   'People with heart or lung disease, older adults, children, and people of lower socioeconomic status should ' ||
   'avoid prolonged or heavy exertion; everyone else should reduce prolonged or heavy exertion.'),
  ('PM2_5', 24, 201, 300, 150.5, 250.4,
   'People with heart or lung disease, older adults, children, and people of lower socioeconomic status should ' ||
   'avoid all physical activity outdoors. Everyone else should avoid prolonged or heavy exertion.'),
  ('PM2_5', 24, 301, 500, 250.5, 500.4,
   'Everyone should avoid all physical activity outdoors; people with heart or lung disease, older adults, ' ||
   'children, and people of lower socioeconomic status should remain indoors and keep activity levels low.'),

  -- PM2.5 24 hour
  ('PM10', 24, 0, 50, 0, 54,
   'None.'),
  ('PM10', 24, 51, 100, 55, 154,
   'Unusually sensitive people should consider reducing prolonged or heavy exertion.'),
  ('PM10', 24, 101, 150, 155, 254,
   'People with heart or lung disease, older adults, children, and people of lower socioeconomic status should ' ||
   'reduce prolonged or heavy exertion.'),
  ('PM10', 24, 151, 200, 255, 354,
   'People with heart or lung disease, older adults, children, and people of lower socioeconomic status should ' ||
   'avoid prolonged or heavy exertion; everyone else should reduce prolonged or heavy exertion.'),
  ('PM10', 24, 201, 300, 355, 424,
   'People with heart or lung disease, older adults, children, and people of lower socioeconomic status should ' ||
   'avoid all physical activity outdoors. Everyone else should avoid prolonged or heavy exertion.'),
  ('PM10', 24, 301, 500, 425, 604,
   'Everyone should avoid all physical activity outdoors; people with heart or lung disease, older adults, ' ||
   'children, and people of lower socioeconomic status should remain indoors and keep activity levels low.');


insert into cayenne.map (key, val, decode_to)
values
  (0, 'TEMPERATURE', 'FLOAT'),
  (1, 'PRESSURE', 'FLOAT'),
  (2, 'REL_HUMIDITY', 'FLOAT'),
  (3, 'GAS_RES', 'FLOAT'),
  (4, 'FAST_AQI', 'U16'),
  (5, 'AQI', 'U16'),
  (6, 'O3', 'FLOAT');

insert into cayenne.channel (key, val)
values
  (0, 'BME688'),
  (1, 'ZMOD4510'),
  (2, 'SPS30');

commit;
