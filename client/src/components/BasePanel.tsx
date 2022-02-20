import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { SxProps } from '@mui/system';

export interface BasePanelProps {
  children?: JSX.Element[] | JSX.Element;
  sx?: SxProps;
  top: JSX.Element;
}

export function BasePanel(props: BasePanelProps) {
  return (
    <Box 
      sx={{ 
        m: 1,
        ...(props.sx || {})
      }} 
      style={{ textAlign: 'left' }}>
     {props.top}
      <Card>
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </Box>
  );
}
