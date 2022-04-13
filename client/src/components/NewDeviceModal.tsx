import { useNavigate } from "react-router-dom";
import { DetailsModal } from "./DetailsModal";
import { NewDeviceForm } from "./NewDeviceForm";

export function NewDeviceModal() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("..");
  };

  return (
    <DetailsModal title='New Device' open onClose={handleClose}>
      <NewDeviceForm onCancel={handleClose}/>
    </DetailsModal>
  )
}
