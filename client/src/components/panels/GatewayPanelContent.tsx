import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGateways } from "../../hooks/gateways";
import { NodeListItem as Item } from "../NodeListItem";

export function GatewayPanelContent() {
  const navigate = useNavigate();
  const { gateways, isLoading, isError } = useGateways();

  if (isError) return <ErrorIcon color="error" />;

  if (isLoading) return <CircularProgress />;

  return (
    <List sx={{ listStylePosition: 'inside', height: '35vh', display: 'block', overflow: 'auto' }}>
      {(gateways ?? []).map(g => {
        if (!g) return <></>
        return <Item primary={g.name} key={g.gateway_id} onClick={() => navigate('gateway/' + g.gateway_id)} />
      })}
    </List>
  );
}
