import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Panel } from './Panel';

export function LayerPanel() {
  const layers = [
    {
      label: 'AQI'
    },
    {
      label: 'PM2.5'
    },
    {
      label: 'PM10'
    },
    {
      label: 'CO2'
    },
    {
      label: 'bVOC'
    },
    {
      label: 'Temperature'
    },
    {
      label: 'Humidity'
    },
  ];

  return (
    <Panel title="Layers" contentSx={{ p: 2 }}>
      <FormControl>
        <RadioGroup defaultValue='AQI'>{
          layers.map(({ label }, index) => (
            <FormControlLabel key={index} value={label} control={<Radio />} label={label} />
          ))
        }</RadioGroup>
      </FormControl>
    </Panel>
  );
}
