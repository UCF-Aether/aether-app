import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import { Box, CircularProgress, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BasePanel } from "./BasePanel";
import { gql, useQuery } from "urql";
import { TabPanelUnstyledProps } from "@mui/material/node_modules/@mui/base";
import ErrorIcon from "@mui/icons-material/Error";

const DEVICE_QUERY = gql`
  query {
    devices {
      nodes {
        deviceId
        name
      }
    }
  }
`;

interface DeviceQueryData {
  devices: {
    nodes: [{ deviceId: number; name: string; }];
  };
}

const GATEWAY_QUERY = gql`
  query {
    gateways {
      nodes {
        gatewayId
        name
      }
    }
  }
`;

interface GatewayQueryData {
  gateways: {
    nodes: [{ gatewayId: number; name: string; }];
  };
}

function Item(props: { primary: string }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={props.primary} />
      </ListItemButton>
    </ListItem>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

// TODO: use theme
const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: gray;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: transparent;
  /* width: 100%; */
  padding: 12px 10px 0px 0px;
  /* margin: 6px 6px; */
  border: none;
  /* border-radius: 5px; */
  display: flex;
  justify-content: left;

  /* &:hover { */
  /*   background-color: ${blue[400]}; */
  /* } */

  &:focus {
    /* color: #fff; */
    /* border-radius: 3px; */
    /* outline: 2px solid ${blue[200]}; */
    /* outline-offset: 2px; */
  }

  &.${tabUnstyledClasses.selected} {
    /* background-color: ${blue[50]}; */
    color: black;
    /* color: ${blue[600]}; */
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  /* min-width: 320px; */
  /* background-color: ${blue[500]}; */
  /* border-radius: 8px; */
  /* margin-bottom: 16px; */
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  /* align-content: space-between; */
`;

function DevicePanelContent() {
  const [result, reexecuteQuery] = useQuery({
    query: DEVICE_QUERY,
  });

  const { data, fetching, error } = result;

  if (error) return <ErrorIcon color="error" />;

  if (fetching) return <CircularProgress />;

  return (
    <List>
      {(data as DeviceQueryData).devices.nodes.map(({ deviceId, name }) => (
        <Item primary={name} key={deviceId} />
      ))}
    </List>
  );
}

function GatewayPanelContent() {
  const [result, reexecuteQuery] = useQuery({
    query: GATEWAY_QUERY,
  });

  const { data, fetching, error } = result;

  if (error) return <ErrorIcon color="error" />;

  if (fetching) return <CircularProgress />;

  return (
    <List>
      {(data as GatewayQueryData).gateways.nodes.map(({ gatewayId, name }) => (
        <Item primary={name} key={gatewayId} />
      ))}
    </List>
  );
}

export function NodePanel() {
  const tabs = (
    <TabsList>
      <Tab>Devices</Tab>
      <Tab>Gateways</Tab>
    </TabsList>
  );

  return (
    <TabsUnstyled defaultValue={0}>
      <BasePanel top={tabs}>
        <nav>
          <TabPanel value={0}>
            <DevicePanelContent />
          </TabPanel>
          <TabPanel value={1}>
            <GatewayPanelContent />
          </TabPanel>
        </nav>
      </BasePanel>
    </TabsUnstyled>
  );
}
