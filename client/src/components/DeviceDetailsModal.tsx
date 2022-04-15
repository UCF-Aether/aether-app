import { Box, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeviceInfo } from "../hooks/devices";
import { DetailsModal } from "./DetailsModal";
import { Error } from "./Error";
import { LayersLine } from "./LayersLineGraph";
import { DeviceInfoPanel } from "./panels/DeviceInfoPanel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {props.children}
        </Box>
      )}
    </div>
  );
}

export function DeviceDetailsModal() {
  const params = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const deviceId = Number(params.deviceId ?? "-1");
  const {
    device,
    error,
    isLoading,
    isError,
  } = useDeviceInfo(deviceId, { poll: true });

  const handleClose = () => {
    navigate("..");
  };


  const FetchingContent = () => (
    <Skeleton animation="wave" variant="rectangular" width="100%" height="30%" sx={{ my: 2 }} />
  );

  const Info = () => {
    if (isError) return <Error message={error.message}/>;
    if (isLoading || !device) return <FetchingContent />;
    return (
      <DeviceInfoPanel
        info={{
          devEui: device.dev_eui,
          createdAt: device.created_at,
          updatedAt: device.updated_at,
          activationMethod: device.activation_method,
          lat: device.lat,
          lng: device.lng,
          locUpdatedAt: device.loc_updated_at,
          lastUplink: device.last_uplink_at,
          lastDownlink: device.last_downlink_at,
        }}
      />
    );
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <DetailsModal title="Device" subTitle={device?.name} open onClose={handleClose}>
      <Info />
      <Typography variant='h5' fontWeight='bold'>
      Real-Time
      </Typography>
      <Tabs value={tab} onChange={handleTabChange} variant="scrollable">
        <Tab label="PM"/>
        <Tab label="O3"/>
        <Tab label="Humidity"/>
        <Tab label="Temperature"/>
      </Tabs> 
      <TabPanel value={tab} index={0}>
          <LayersLine realtime deviceId={deviceId} layers={["RAW_PM10", "RAW_PM2_5"]} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
          <LayersLine realtime deviceId={deviceId} layers={["RAW_O3"]} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
          <LayersLine realtime deviceId={deviceId} layers={["RAW_REL_HUMIDITY"]} />
      </TabPanel>
      <TabPanel value={tab} index={3}>
          <LayersLine realtime deviceId={deviceId} layers={["RAW_TEMPERATURE"]} />
      </TabPanel>

      <LayersLine title="Hourly AQI" deviceId={deviceId} layers={["AQI_O3", "AQI_O3_PM"]} />
      <LayersLine title="Hourly Particulate Matter" deviceId={deviceId} layers={["PM2_5", "PM10"]} />
      <LayersLine title="Hourly Gases" deviceId={deviceId} layers={["O3"]} />
    </DetailsModal>
  );
}
