import ErrorIcon from "@mui/icons-material/Error";
import { Box, Skeleton, Typography } from "@mui/material";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useNavigate, useParams } from "react-router-dom";
import { useDeviceInfo, useDevices } from "../hooks/devices";
import { DetailsModal } from "./DetailsModal";
import { DeviceInfoPanel } from "./panels/DeviceInfoPanel";
import { Panel } from "./panels/Panel";

interface ReadingsLineGraphProps {
  data: Serie[];
  title: string;
  yAxisLengend: string;
}

const ReadingsLineGraph = (props: ReadingsLineGraphProps) => (
  <Panel title={props.title} contentSx={{ height: 400 }}>
    <ResponsiveLine
      data={props.data}
      margin={{ top: 50, right: 40, bottom: 60, left: 60 }}
      xScale={{ type: "time", format: "native" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%m/%d",
        tickValues: "every 1 day",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "time",
        legendOffset: 45,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: props.yAxisLengend,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={{ scheme: "nivo" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  </Panel>
);

export function DeviceDetailsModal() {
  const params = useParams();
  const navigate = useNavigate();
  const deviceId = Number(params.deviceId ?? "-1");
  const {
    device,
    error,
    isLoading: isDeviceLoading,
    isError: isDeviceError,
  } = useDeviceInfo(deviceId);

  const handleClose = () => {
    navigate("/");
  };

  const ErrorContent = ({ message = '' }) => (
    <Box>
      <ErrorIcon color="error" />
      <Typography>{message}</Typography>
    </Box>
  );

  const FetchingContent = () => (
    <Skeleton animation="wave" variant="rectangular" width="100%" height="30%" sx={{ my: 2 }} />
  );

  const Info = () => {
    if (isDeviceError) return <ErrorContent />;
    if (isDeviceLoading || !device) return <FetchingContent />;
    return (
      <DeviceInfoPanel
        info={{
          devEui: device.dev_eui,
          createdAt: device.created_at,
          updatedAt: device.updated_at,
          activationMethod: 'TODO',
          lat: device.lat,
          lng: device.lng,
          locUpdatedAt: device.loc_updated_at,
          lastUplink: device.last_uplink_at,
          lastDownlink: device.last_downlink_at,
        }}
      />
    );
  }


  return (
    <DetailsModal title="Device" subTitle={device?.name} open onClose={handleClose}>
      <Info />
      <ReadingsLineGraph
        title="AQI Over Time"
        yAxisLengend="AQI"
        data={[{ id: "AQI", data: [] }]}
      />
      <ReadingsLineGraph
        title="Gases Over Time"
        yAxisLengend="ppb"
        data={[
          { id: "PM2.5", data: [] },
          { id: "VOC", data: [] },
        ]}
      />
    </DetailsModal>
  );
}
