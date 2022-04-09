import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { NodeListItem as Item } from "../NodeListItem";
import { List } from "@mui/material";
import { useGateways } from "../../hooks/gateways";

export function GatewayPanelContent() {
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useGateways();

  if (isError) return <ErrorIcon color="error" />;

  if (isLoading) return <CircularProgress />;

  return (
    <List sx={{ listStylePosition: 'inside', height: '35vh', display: 'block', overflow: 'auto' }}>
      {(data ?? []).map(g => {
        if (!g) return <></>
        return <Item primary={g.name} key={g.gateway_id} onClick={() => navigate('gateway/' + g.gateway_id)} />
      })}
    </List>
  );
}
