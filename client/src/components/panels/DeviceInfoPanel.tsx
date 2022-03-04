import { useQuery } from "urql";
import ErrorIcon from "@mui/icons-material/Error";
import {
  LinearProgress, Paper, Table, TableBody,
  TableCell, TableContainer, TableRow, Typography
} from
  "@mui/material";
import { Panel } from "./Panel";

export interface DeviceInfo {
  devEui?: string | null;
  activationMethod?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  locUpdatedAt?: string | null;
  lastUplink?: string | null;
  lastDownlink?: string | null;
  lat?: number | null;
  lng?: number | null;
}

export interface DeviceInfoPanelProps {
  children?: JSX.Element[] | JSX.Element;
  error?: string;
  fetching?: boolean;
  skipMissing?: boolean;
  info: DeviceInfo;
}

export function DeviceInfoPanel(props: DeviceInfoPanelProps) {
  if (props.error)
    return <ErrorIcon color='error' />

  if (props.fetching) return <LinearProgress />

  const info = props.info;

  let rows = [
    {
      key: "Device EUI",
      value: info.devEui,
    },
    {
      key: "Created At",
      value: info.createdAt,
    },
    {
      key: "Updated At",
      value: info.updatedAt,
    },
    {
      key: "Activation Method",
      value: info.activationMethod,
    },
    {
      key: "Last Uplink",
      value: info.lastUplink,
    },
    {
      key: "Last Downlink",
      value: info.lastDownlink,
    },
    {
      key: "Location",
      value: info.lat && info.lng ? `(${info.lat}, ${info.lng})` : undefined,
    },
    {
      key: "Location Updated At",
      value: info.locUpdatedAt,
    },
  ];

  if (props.skipMissing) rows = rows.filter(r => r.value != undefined || r.value != null);

  return (
    <Panel title='Info'>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>{
            rows.map(r => (
              <TableRow key={r.key}>
                <TableCell component='th'>{r.key}</TableCell>
                <TableCell align='right'>{r.value ?? '-'}</TableCell>
              </TableRow>
            ))
          }</TableBody>
        </Table>
      </TableContainer>
    </Panel>
  );
}
