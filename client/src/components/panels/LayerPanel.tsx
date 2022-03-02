import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Panel } from './Panel';


export interface LayerPanelProps {
  onChange: (layer: string) => void;
}

export function LayerPanel(props?: LayerPanelProps) {
  const [value, setValue] = useState('AQI');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, layer: string) => {
    setValue(layer);
    props?.onChange(layer);
  }

  // Set initial value ??
  useEffect(() => props?.onChange(value), []);

  const layers = [
    {
      label: 'AQI',
      key: 'AQI',
    },
    {
      label: 'PM2.5',
      key: 'PM2.5',
    },
    {
      label: 'PM10',
      key: 'PM10'
    },
    {
      label: 'CO2',
      key: 'CO2',
    },
    {
      label: 'bVOC',
      key: 'VOC',
    },
    {
      label: 'Temperature',
      key: 'TEMPERATURE',
    },
    {
      label: 'Humidity',
      key: 'HUMIDITY',
    },
  ];


  return (
    <Panel title="Layers" contentSx={{ p: 2, height: '20vh', overflow: 'auto' }}>
      <FormControl>
        <RadioGroup value={value} onChange={handleChange} >{
          layers.map(({ key, label }) => (
            <FormControlLabel key={key} value={key} control={<Radio />} label={label} />
          ))
        }</RadioGroup>
      </FormControl>
    </Panel>
  );
}
