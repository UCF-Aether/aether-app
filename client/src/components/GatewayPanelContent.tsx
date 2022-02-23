import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, List, Skeleton } from "@mui/material";
import { gql, useQuery } from "urql";
import { useState } from "react";
import { NodeListItem as Item } from "./NodeListItem";
import { DetailsModal } from "./DetailsModal";
import { useNavigate } from "react-router-dom";

const GATEWAY_QUERY = gql`
  query {
    gateways {
      nodes {
        gatewayId
        name
      }
    }
  }
`;

interface GatewayQueryData {
  gateways: {
    nodes: [{ gatewayId: number; name: string }];
  };
}

export function GatewayPanelContent() {
  const [open, setOpen] = useState(false);
  const [curIndex, setCurIndex] = useState(-1);
  const navigate = useNavigate();

  const [result, reexecuteQuery] = useQuery({
    query: GATEWAY_QUERY,
  });

  const { data, fetching, error } = result;

  if (error) return <ErrorIcon color="error" />;

  if (fetching) return <CircularProgress />;

  const gateways = data.gateways.nodes;
  const curGateway = gateways[curIndex];
  const curGatewayId = curGateway?.gatewayId;
  const curGatewayName = curGateway?.name;

  return (
    <>
      <List>
        {(data as GatewayQueryData).gateways.nodes.map(({ gatewayId, name }, index) => (
          <Item primary={name} key={gatewayId} onClick={() => navigate('gateway/' + gatewayId)} />
        ))}
      </List>
    </>
  );
}
