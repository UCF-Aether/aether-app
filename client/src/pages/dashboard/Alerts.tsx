import { Box, LinearProgress, Button } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BasePanel } from "../../components/panels/BasePanel";
import { useAlerts } from "../../hooks/alerts";

const columns: GridColumns = [
  { field: 'name', headerName: 'Name', flex: 1},
  { field: 'dev_eui', headerName: 'Device EUI', flex: 1},
  { field: 'layer', headerName: 'Layer', flex: 1},
  { field: 'trigger', headerName: 'Triggers At', flex: 1},
];

export function Alerts() {
  const navigate = useNavigate();
  const { isLoading, isError, alerts, error } = useAlerts();
  const rows = useMemo(
    () => (alerts ?? []).map(al => ({
      ...al,
      id: al.alert_id,
    })),
    [alerts]
  );

  return (
    <Box sx={{ height: '100vh', m: 2  }}>
      <Button variant='outlined' onClick={() => navigate('new')}>Create Alert</Button>
      <BasePanel contentSx={{ height: '60vh', flexGrow: 1 }}>
        <DataGrid 
          columns={columns} 
          rows={rows} 
          loading={isLoading}
          components={{ LoadingOverlay: LinearProgress }}
        />
      </BasePanel>
      <Outlet />
    </Box>
  );
}
