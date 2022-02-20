import Typography from '@mui/material/Typography';
import { BasePanel } from './BasePanel';

export interface TabbedPanelProps {
  children?: JSX.Element[] | JSX.Element;
  title: string;
}

export function TabbedPanel(props: TabbedPanelProps) {
  const topComp = (
    <Typography variant="h4">
     {props.title}
    </Typography>
  );

  return (
    <BasePanel top={topComp}>
    </BasePanel>
  );
}
