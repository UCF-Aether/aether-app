import { ListItem, ListItemButton, ListItemText } from '@mui/material';

export interface NodeListItemProps {
  primary: string;
  onClick?: () => void;
}

export function NodeListItem(props: NodeListItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={props?.onClick}>
        <ListItemText primary={props.primary} />
      </ListItemButton>
    </ListItem>
  );
}
