import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect } from "react";
import { gql, useQuery } from "urql";

// const rows: GridRowsProp = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];
//
// const columns: GridColDef[] = [
//   { field: 'col1', headerName: 'Column 1', width: 150 },
//   { field: 'col2', headerName: 'Column 2', width: 150 },
// ];

const LOG_QUERY = gql`
  query LogQuery {
    devmsgs {
      nodes {
        deveui
        gweui
        id
        time
        payload
      }
    }
  }
`;

const QUERY_INTERVAL = 2000;

export default function LogTable() {
  const [result, reexecuteQuery] = useQuery({
    query: LOG_QUERY,
  });


  useEffect(() => {
    if (result.fetching) return;

    const timerId = setInterval(() => {
      reexecuteQuery({ requestPolicy: 'network-only' });
    }, QUERY_INTERVAL);

    return () => clearInterval(timerId);
  }, [result.fetching, reexecuteQuery]);

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>
  if (error) return <p>WHYYYYYYYY...{error.message}</p>

  const columns: Array<GridColDef> = [
    { field: 'time', headerName: 'Time', width: 250 },
    { field: 'deveui', headerName: 'DevEUI', width: 150 },
    { field: 'gweui', headerName: 'GatewayEUI', width: 160 },
    { field: 'payload', headerName: 'Payload', width: 500 },
  ];

  const rows: Array<GridRowsProp> = data.devmsgs.nodes.map((n: any) => {
    return { id: n.id, time: n.time, deveui: n.deveui, gweui: n.gweui, payload: n.payload } 
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        initialState={{
          sorting: {
            sortModel: [
              { field: 'time', sort: 'desc' },
            ]
          }
        }}
      />
    </div>
  );
}
