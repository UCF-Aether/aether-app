import { Stack, Typography, useTheme } from '@mui/material';
import { Blob } from './Blob';

export interface OnlineIndicatorProps {
  online?: boolean;
  onlineColor?: string;
  offlineColor?: string;
}

export function OnlineIndicator(props: OnlineIndicatorProps) {
  const theme = useTheme();
  const { online, onlineColor, offlineColor } = props;

  const bloby = online 
    ? <Blob color={onlineColor} />
    : <Blob color={offlineColor ?? theme.palette.error.main} animate={false}/>;
  
  const status = online ? 'Online' : 'Offline';

  return (
    <Stack 
      direction='row'
      alignItems='center'
      gap={0}
      sx={{ 
        zIndex: 10, 
        position: 'absolute', 
        right: 50, 
        bottom: 35, 
        textAlign: 'center',
      }}
    >
      {bloby}
      <Typography variant='subtitle2'>{status}</Typography>
    </Stack>
  );
}
