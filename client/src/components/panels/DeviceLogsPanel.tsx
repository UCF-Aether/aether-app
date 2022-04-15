import { Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useDeviceEvents, Event } from "../../hooks/events";

export interface DeviceLogsPanelProps {
  deviceId: number;
}

const columns = [
  { field: "type", headerName: "Type", width: 70 },
  { field: "committedAt", headerName: "Committed At", minWidth: 180 },
  { field: "body", headerName: "Body", flex: Infinity },
];

const FetchingContent = () => (
  <Skeleton animation="wave" variant="rectangular" width="100%" height="30%" sx={{ my: 2 }} />
);

export function DeviceLogsPanel(props: DeviceLogsPanelProps) {
  const { deviceId } = props;
  const { isLoading, isError, data } = useDeviceEvents(deviceId);
  console.log(data);

  if (isError || isLoading) return <FetchingContent />

  const rows = data.map((event: Event) => ({
    id: event.event_id,
    type: event.type.split('_')[1],
    committedAt: new Date(event.commited_at).toLocaleString(),
    body: JSON.stringify(event.body),
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid 
            rows={rows} 
            columns={columns} 
            rowHeight={32} 
            initialState={{
              sorting: {
                sortModel: [{field: "committedAt", sort: "desc" }],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
