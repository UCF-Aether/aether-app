import { useNavigate } from "react-router-dom";
import { DetailsModal } from "./DetailsModal";
import { NewAlertForm } from "./NewAlertForm";

export function NewAlertModal() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("..");
  };

  return (
    <DetailsModal title='New Alert' open onClose={handleClose}>
      <NewAlertForm />
    </DetailsModal>
  )
}
