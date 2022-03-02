import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "urql";
import { GatewaysDocument } from "../../generated/graphql";
import { NodeListItem as Item } from "../NodeListItem";

export function GatewayPanelContent() {
  const navigate = useNavigate();

  const [result, reexecuteQuery] = useQuery({
    query: GatewaysDocument,
  });

  const { data, fetching, error } = result;

  if (error) return <ErrorIcon color="error" />;

  if (fetching) return <CircularProgress />;

  const gateways = data?.gateways?.nodes || [];

  return (
      <List>
        {gateways.map(g => {
          if (!g) return <></>
          return <Item primary={g.name} key={g.gatewayId} onClick={() => navigate('gateway/' + g.gatewayId)} />
        })}
      </List>
  );
}
