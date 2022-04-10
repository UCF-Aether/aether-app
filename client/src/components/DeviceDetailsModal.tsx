import { Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDeviceInfo } from "../hooks/devices";
import { DetailsModal } from "./DetailsModal";
import { Error } from "./Error";
import { LayersLine } from "./LayersLineGraph";
import { DeviceInfoPanel } from "./panels/DeviceInfoPanel";

export function DeviceDetailsModal() {
  const params = useParams();
  const navigate = useNavigate();
  const deviceId = Number(params.deviceId ?? "-1");
  const {
    device,
    error,
    isLoading,
    isError,
  } = useDeviceInfo(deviceId);

  const handleClose = () => {
    navigate("/");
  };


  const FetchingContent = () => (
    <Skeleton animation="wave" variant="rectangular" width="100%" height="30%" sx={{ my: 2 }} />
  );

  const Info = () => {
    if (isError) return <Error/>;
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

  return (
    <DetailsModal title="Device" subTitle={device?.name} open onClose={handleClose}>
      <Info />
      <LayersLine title="AQI" deviceId={deviceId} layers={["AQI_O3", "AQI_O3_PM"]} />
      <LayersLine title="Particulate Matter" deviceId={deviceId} layers={["PM2_5", "PM10"]} />
      <LayersLine title="Gases" deviceId={deviceId} layers={["O3"]} />
    </DetailsModal>
  );
}
