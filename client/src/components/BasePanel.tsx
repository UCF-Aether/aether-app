import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { SxProps } from '@mui/system';

export interface BasePanelProps {
  children?: JSX.Element[] | JSX.Element;
  sx?: SxProps;
  contentSx?: SxProps;
  top: JSX.Element;
  pt?: number;
  pb?: number;
}

export function BasePanel(props: BasePanelProps) {
  return (
    <Box 
      sx={{ 
        m: 2,
        ...(props.sx || {})
      }} 
      style={{ textAlign: 'left' }}>
     {props.top}
      <Card>
        <CardContent 
          sx={{
            p: 0,
            '&:first-child': {
              paddingTop: props.pt || 0,
            },
            '&:last-child': {
              paddingBottom: props.pb || 0,
            },
            ...(props.contentSx || {})
          }}
        >
          {props.children}
        </CardContent>
      </Card>
    </Box>
  );
}
