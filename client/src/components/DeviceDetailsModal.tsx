import { Skeleton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { DetailsModal } from './DetailsModal';
import { DeviceInfoDocument } from '../generated/graphql';
import ErrorIcon from "@mui/icons-material/Error";
import { DeviceInfoPanel } from './panels/DeviceInfoPanel';
import { SwitchErrorComponentProps, UrqlSwitch } from './UrqlSwitch';

export function DeviceDetailsModal() {
  const params = useParams();
  const navigate = useNavigate();
  const deviceId = Number(params.deviceId ?? '-1');

  const [result, reexecuteQuery] = useQuery({
    query: DeviceInfoDocument,
    variables: { deviceId }
  });

  const handleClose = () => {
    navigate('/');
  }


  const { data } = result;
  console.log(data);

  // TODO: handle no device found
  const device = data?.device;
  const meta = device?.deviceMeta;

  const ErrorContent = (props?: SwitchErrorComponentProps) => (
    <>
      <ErrorIcon color='error' />
      <Typography>{props?.error ?? ''}</Typography>
    </>
  );

  const FetchingContent = () => (
    <>
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 2 }} />
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4 }} />
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4 }} />
    </>
  );

  const DataContent = () => {
    if (!device) return <ErrorContent error='Device not found' />

    return (
      <DeviceInfoPanel info={{
        devEui: device?.devEui,
        createdAt: meta?.createdAt,
        updatedAt: meta?.updatedAt,
        activationMethod: device?.activationMethod,
        lat: meta?.loc?.locGeog.latitude,
        lng: meta?.loc?.locGeog.longitude,
        locUpdatedAt: meta?.locUpdatedAt,
        lastUplink: meta?.lastUplinkAt,
        lastDownlink: meta?.lastDownlinkAt,
      }} />
    );
  };

  return (
    <DetailsModal title='Device' subTitle={device?.name} open onClose={handleClose}>
      <UrqlSwitch 
        query={[result, reexecuteQuery]} 
        error={ErrorContent} 
        fetching={FetchingContent} 
        data={DataContent}
      />
    </DetailsModal>
  );
}
