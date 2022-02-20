import Typography from '@mui/material/Typography';
import { BasePanel } from './BasePanel';

export interface PanelProps {
  children: JSX.Element[] | JSX.Element;
  title: string;
}

export function Panel(props: PanelProps) {
  const topComp = (
    <Typography variant='h5' fontWeight='bold'>
     {props.title}
    </Typography>
  );

  return (
    <BasePanel top={topComp}>
      {props.children}
    </BasePanel>
  );
}
