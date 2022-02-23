import { CircularProgress, List, Skeleton } from "@mui/material";
import { useState } from "react";
import { gql, useQuery } from "urql";
import { DetailsModal } from "./DetailsModal";
import ErrorIcon from '@mui/icons-material/Error';
import { NodeListItem as Item} from "./NodeListItem";

const DEVICE_QUERY = gql`
  query {
    devices {
      nodes {
        deviceId
        name
      }
    }
  }
`;

interface DeviceQueryData {
  devices: {
    nodes: [{ deviceId: number; name: string; }];
  };
}

export function DevicePanelContent() {
  const [open, setOpen] = useState(false);
  const [curIndex, setCurIndex] = useState(-1);
  const handleOpen = (index: number) => {
    return () => {
      setCurIndex(index);
      setOpen(true);
    }
  }
  const handleClose = () => setOpen(false);

  const [result, reexecuteQuery] = useQuery({
    query: DEVICE_QUERY,
  });

  const { data, fetching, error } = result;

  if (error) return <ErrorIcon color='error' />;

  if (fetching) return <CircularProgress />;

  const devices = data.devices.nodes;
  const curDevice = devices[curIndex];
  const curDeviceId = curDevice?.deviceId;
  const curDeviceName = curDevice?.name;

  return (
    <>
      <List>
        {(data as DeviceQueryData).devices.nodes.map(({ deviceId, name }, index) => (
          <Item primary={name} key={deviceId} onClick={handleOpen(index)} />
        ))}
      </List>
      <DetailsModal title='Device' subTitle={curDeviceName} open={open} onClose={handleClose}>
        <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 2}}/>       
        <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4}}/>       
        <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4}}/>       
      </DetailsModal>

    </>
  );
}
