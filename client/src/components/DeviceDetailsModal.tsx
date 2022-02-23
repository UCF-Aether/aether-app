import { DetailsModal } from './DetailsModal';
import { Skeleton } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function DeviceDetailsModal() {
  const params = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  }

  const deviceId = params.deviceId;
  
  return (
    <DetailsModal title='Device' subTitle={deviceId} open onClose={handleClose}>
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 2 }} />
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4 }} />
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4 }} />
    </DetailsModal>
  );
}
