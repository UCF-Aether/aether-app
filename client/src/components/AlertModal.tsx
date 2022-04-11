import { useNavigate } from "react-router-dom";
import { DetailsModal } from "./DetailsModal";

export interface AlertModalProps {
  editing?: boolean;
}

export function AlertModal(props?: AlertModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("..");
  };

  console.log('hi');
  return (
    <DetailsModal title='Alert' subTitle='99' open onClose={handleClose}>
      <p>hi</p>
    </DetailsModal>
  )
}
