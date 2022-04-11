import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDevices } from "../hooks/devices";
import { DetailsModal } from "./DetailsModal";
import { NewAlertForm } from "./NewAlertForm";

export function NewAlertModal() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("..");
  };

  console.log('hi');
  return (
    <DetailsModal title='New Alert' open onClose={handleClose}>
      <NewAlertForm />
    </DetailsModal>
  )
}
