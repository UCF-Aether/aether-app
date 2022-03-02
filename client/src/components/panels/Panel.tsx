import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import { BasePanel } from './BasePanel';

export interface PanelProps {
  children: JSX.Element[] | JSX.Element;
  title: string;
  contentSx?: SxProps;
}

export function Panel(props: PanelProps) {
  const topComp = (
    <Typography variant='h5' fontWeight='bold'>
     {props.title}
    </Typography>
  );

  return (
    <BasePanel top={topComp} contentSx={props.contentSx}>
      {props.children}
    </BasePanel>
  );
}
