import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Panel } from './Panel';
import { layers, LayerType } from '../../layers';

export interface LayerPanelProps {
  onChange: (layer: LayerType) => void;
  value: LayerType;
}

export function LayerPanel(props: LayerPanelProps) {
  const { onChange, value } = props;

  return (
    <Panel title="Layers" contentSx={{ p: 2, height: '20vh', overflow: 'auto' }}>
      <FormControl>
        <RadioGroup value={value} onChange={(event, key ) => onChange(key as LayerType)} >{
          Object.entries(layers).map(([ key, { title } ]) => (
            <FormControlLabel key={key} value={key} control={<Radio />} label={title} />
          ))
        }</RadioGroup>
      </FormControl>
    </Panel>
  );
}
