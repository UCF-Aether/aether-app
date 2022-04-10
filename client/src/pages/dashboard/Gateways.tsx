import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "urql";
import LinearProgress from '@mui/material/LinearProgress';
import { BasePanel } from "../../components/panels/BasePanel";
import { DevicesDocument, GatewaysDocument } from "../../generated/graphql";

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "id", headerName: "Gateway EUI", flex: 1},
  { field: "updatedAt", headerName: "Updated At", flex: 1},
];

export function Gateways() {
  const [{ data, fetching, error }, getDevices] = useQuery({
    query: GatewaysDocument,
  });

  const rows = data?.gateways?.nodes
    .filter(dev => dev != null)
    .map(gw => ({
      id: gw.id,
      name: gw.name,
      updatedAt: gw.gatewayMeta.updatedAt ?? '-',
    })) || [];

  return (
    <Box sx={{ height: '100vh', m: 2  }}>
      <Button variant='outlined'>Add Gateway</Button>
      <BasePanel contentSx={{ height: '60vh', flexGrow: 1 }}>
        <DataGrid 
          columns={columns} 
          rows={rows} 
          loading={fetching}
          error={error}
          components={{ LoadingOverlay: LinearProgress }}
        />
      </BasePanel>
    </Box>
  );
}
