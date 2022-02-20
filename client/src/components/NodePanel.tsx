import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { BasePanel } from "./BasePanel";

function Item(props: { primary: string }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={props.primary} />
      </ListItemButton>
    </ListItem>
  );
}

export function NodePanel() {
  const tabs = (
    <TabsListUnstyled>
      <TabUnstyled>Devices</TabUnstyled>
      <TabUnstyled>Gateways</TabUnstyled>
    </TabsListUnstyled>
  );

  const deviceList = (
    <List>
      <Item primary="Device 1" />
      <Item primary="Device 2" />
      <Item primary="Device 3" />
    </List>
  );

  const gatewayList = (
    <List>
      <Item primary="Gateway 1" />
      <Item primary="Gateway 2" />
      <Item primary="Gateway 3" />
    </List>
  );

  return (
    <TabsUnstyled defaultValue={0}>
      <BasePanel top={tabs}>
        <nav>
          <TabPanelUnstyled value={0}>{deviceList}</TabPanelUnstyled>
          <TabPanelUnstyled value={1}>{gatewayList}</TabPanelUnstyled>
        </nav>
      </BasePanel>
    </TabsUnstyled>
  );
}
