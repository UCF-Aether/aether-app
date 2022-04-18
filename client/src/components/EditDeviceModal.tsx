import { Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDeviceInfo } from "../hooks/devices";
import { DetailsModal } from "./DetailsModal";
import { DeviceForm } from "./NewDeviceForm";

export function EditDeviceModal() {
  const params = useParams();
  const navigate = useNavigate();

  const deviceId = Number(params.deviceId ?? "-1");
  const {
    device,
    error,
    isLoading,
    isError,
  } = useDeviceInfo(deviceId, { poll: false });

  const handleClose = () => {
    navigate("..");
  };

  if (isLoading) return (
    <Skeleton animation="wave" variant="rectangular" width="100%" height="30%" sx={{ my: 2 }} />
  )

  return (
    <DetailsModal title='Edit Device' open onClose={handleClose}>
      <DeviceForm editing onCancel={handleClose} device={device} />
    </DetailsModal>
  )
}
