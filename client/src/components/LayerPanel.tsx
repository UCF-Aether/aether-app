import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Panel } from './Panel';

export function LayerPanel() {
  return (
    <Panel title="Layers" contentSx={{ p: 2 }}>
      <FormControl>
        <RadioGroup>
          <FormControlLabel value="test1" control={<Radio />} label="Test1"/>
          <FormControlLabel value="test2" control={<Radio />} label="Test2"/>
          <FormControlLabel value="test3" control={<Radio />} label="Test3"/>
          <FormControlLabel value="test4" control={<Radio />} label="Test4"/>
        </RadioGroup>
      </FormControl>
    </Panel>
  );
}
