import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import { BasePanel } from "../../components/panels/BasePanel";
import { useDevices } from "../../hooks/devices";
import { useMemo } from "react";

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "dev_eui", headerName: "Device EUI", flex: 1},
  { field: "updated_at", headerName: "Updated At", flex: 1},
];

export function Devices() {
  const { isLoading, isError, devices } = useDevices();
  const rows = useMemo(
    () => (devices ?? []).map(d => ({
      ...d,
      id: d.device_id,
      updated_at: d.updated_at ?? '-',
    })), 
    [devices]);

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
