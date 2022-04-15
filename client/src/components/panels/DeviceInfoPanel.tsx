import ErrorIcon from "@mui/icons-material/Error";
import {
    LinearProgress, Paper, Table, TableBody,
    TableCell, TableContainer, TableRow
} from "@mui/material";
import { Panel } from "./Panel";

export interface DeviceInfo {
  devEui?: string | null;
  activationMethod?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  locUpdatedAt?: Date | null;
  lastUplink?: Date | null;
  lastDownlink?: Date | null;
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
      value: info.createdAt && new Date(info.createdAt).toLocaleString(),
    },
    {
      key: "Updated At",
      value: info.updatedAt && new Date(info.updatedAt).toLocaleString(),
    },
    {
      key: "Activation Method",
      value: info.activationMethod,
    },
    {
      key: "Last Uplink",
      value: info.lastUplink && new Date(info.lastUplink).toLocaleString(),
    },
    {
      key: "Last Downlink",
      value: info.lastDownlink && new Date(info.lastDownlink).toLocaleString(),
    },
    {
      key: "Location (lat, lng)",
      value: info.lat != undefined && info.lng != undefined ? `(${info.lat}, ${info.lng})` : undefined,
    },
    {
      key: "Location Updated At",
      value: info.locUpdatedAt && new Date(info.locUpdatedAt).toLocaleString(),
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
                <TableCell component='th'><b>{r.key}</b></TableCell>
                <TableCell align='right'>{r.value ?? '-'}</TableCell>
              </TableRow>
            ))
          }</TableBody>
        </Table>
      </TableContainer>
    </Panel>
  );
}
