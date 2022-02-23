import ErrorIcon from '@mui/icons-material/Error';
import { CircularProgress, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'urql';
import { DevicesDocument } from '../generated/graphql';
import { NodeListItem as Item } from './NodeListItem';

export function DevicePanelContent() {
  const navigate = useNavigate();

  const [result, reexecuteQuery] = useQuery({
    query: DevicesDocument,
  });

  const { data, fetching, error } = result;

  if (error) return <ErrorIcon color='error' />;

  if (fetching) return <CircularProgress />;

  const devices = data?.devices?.nodes || [];
  return (
    <List>
      {devices
        .map(d => {
          if (!d) return <></>
          return <Item primary={d.name} key={d.deviceId} onClick={() => navigate('device/' + d.deviceId)} />
        })
      }</List>
  );
}
