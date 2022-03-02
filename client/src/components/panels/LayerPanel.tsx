import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Panel } from './Panel';

export type Layer =
  'aqi'
  | 'co2'
  | 'voc'
  | 'pm2_5'
  | 'pm10'
  | 'temperature'
  | 'Humidity';

export type SetLayer = (layer: Layer) => void;

export function LayerPanel() {
  const layers = [
    {
      label: 'AQI',
      key: 'aqi',
    },
    {
      label: 'PM2.5',
      key: 'pm2_5',
    },
    {
      label: 'PM10',
      key: 'pm10'
    },
    {
      label: 'CO2',
      key: 'co2',
    },
    {
      label: 'bVOC',
      key: 'voc',
    },
    {
      label: 'Temperature',
      key: 'temperature',
    },
    {
      label: 'Humidity',
      key: 'humidity',
    },
  ];

  return (
    <Panel title="Layers" contentSx={{ p: 2 }}>
      <FormControl>
        <RadioGroup defaultValue='aqi'>{
          layers.map(({ key, label }, index) => (
            <FormControlLabel key={key} value={key} control={<Radio />} label={label} />
          ))
        }</RadioGroup>
      </FormControl>
    </Panel>
  );
}
