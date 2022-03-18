import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "urql";
import LinearProgress from '@mui/material/LinearProgress';
import { BasePanel } from "../../components/panels/BasePanel";
import { DevicesDocument } from "../../generated/graphql";

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "id", headerName: "Device EUI", flex: 1},
  { field: "updatedAt", headerName: "Updated At", flex: 1},
];

export function Devices() {
  const [{ data, fetching, error }, getDevices] = useQuery({
    query: DevicesDocument,
  });

  const rows = data?.devices?.nodes
    .filter(dev => dev != null)
    .map(dev => ({
      name: dev.name,
      id: dev.devEui,
      updatedAt: dev.deviceMeta.updatedAt ?? '-',
    })) || [];

  return (
    <Box sx={{ height: '100vh', m: 2  }}>
      <Button variant='outlined'>Add Device</Button>
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
