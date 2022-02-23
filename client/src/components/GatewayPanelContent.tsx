import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, List, Skeleton } from "@mui/material";
import { gql, useQuery } from "urql";
import { useState } from "react";
import { NodeListItem as Item } from "./NodeListItem";
import { DetailsModal } from "./DetailsModal";

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
  const handleOpen = (index: number) => {
    return () => {
      setCurIndex(index);
      setOpen(true);
    };
  };
  const handleClose = () => setOpen(false);

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
          <Item primary={name} key={gatewayId} onClick={handleOpen(index)} />
        ))}
      </List>
      <DetailsModal title='Gateway' subTitle={curGatewayName} open={open} onClose={handleClose}>
        <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 2}}/>       
        <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4}}/>       
        <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4}}/>       
      </DetailsModal>
    </>
  );
}
