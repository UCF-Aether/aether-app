import { Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsModal } from './DetailsModal';

export function GatewayDetailsModal() {
  const params = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  }

  const gatewayId = params.gatewayId;

  return (
    <DetailsModal title='Gateway' subTitle={gatewayId} open onClose={handleClose}>
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 2 }} />
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4 }} />
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4 }} />
    </DetailsModal>
  );
}
