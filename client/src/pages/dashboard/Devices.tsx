import { Box, Button } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import { BasePanel } from "../../components/panels/BasePanel";
import { Device, useDevices } from "../../hooks/devices";
import { useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "dev_eui", headerName: "Device EUI", flex: 1},
  { field: "updated_at", headerName: "Updated At", flex: 1},
];

export function Devices() {
  const navigate = useNavigate();
  const { isLoading, isError, devices } = useDevices();
  const rows = useMemo(
    () => (devices ?? []).map(d => ({
      ...d,
      id: d.device_id,
      updated_at: d.updated_at ?? '-',
    })), 
    [devices]);

  const handleRowClick = (params: any) => {
    console.log(params);
    navigate(`${params.row.device_id}`);
  }

  return (
    <Box sx={{ height: '100vh', m: 2  }}>
      <Button variant='outlined'>Add Device</Button>
      <BasePanel contentSx={{ height: '60vh', flexGrow: 1 }}>
        <DataGrid 
          columns={columns} 
          rows={rows} 
          loading={isLoading}
          components={{ LoadingOverlay: LinearProgress }}
          onRowClick={handleRowClick}
        />
      </BasePanel>
      <Outlet />
    </Box>
  );
}
