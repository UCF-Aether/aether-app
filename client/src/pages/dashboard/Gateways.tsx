import { Box, Button } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { BasePanel } from "../../components/panels/BasePanel";
import { useGateways } from "../../hooks/gateways";

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "gateway_eui", headerName: "Gateway EUI", flex: 1},
  { field: "updated_at", headerName: "Updated At", flex: 1},
];

export function Gateways() {
  const { isLoading, isError, gateways } = useGateways();
  const rows = useMemo(
    () => (gateways ?? []).map(g => ({
      ...g,
      id: g.gateway_id,
      updated_at: g.updated_at ?? '-',
    })), 
    [gateways]);

  return (
    <Box sx={{ height: '100vh', m: 2  }}>
      <Button variant='outlined'>Add Device</Button>
      <BasePanel contentSx={{ height: '60vh', flexGrow: 1 }}>
        <DataGrid 
          columns={columns} 
          rows={rows} 
          loading={isLoading}
          components={{ LoadingOverlay: LinearProgress }}
        />
      </BasePanel>
    </Box>
  );
}
