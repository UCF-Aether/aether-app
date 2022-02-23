import { CircularProgress, List, Skeleton } from "@mui/material";
import { useState } from "react";
import { gql, useQuery } from "urql";
import { DetailsModal } from "./DetailsModal";
import ErrorIcon from '@mui/icons-material/Error';
import { NodeListItem as Item} from "./NodeListItem";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
          <Item primary={name} key={deviceId} onClick={() => navigate('device/' + deviceId)} />
        ))}
      </List>

    </>
  );
}
