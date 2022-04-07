import { useNavigate } from "react-router-dom";
import { useDevices } from "../../hooks/devices";
import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { NodeListItem as Item } from "../NodeListItem";
import { List } from "@mui/material";

export function DevicePanelContent() {
  const navigate = useNavigate();
  const { devices, error, isLoading, isError } = useDevices();

  if (isError) return <ErrorIcon color="error" />;
  if (isLoading) return <CircularProgress />;

  return (
    <List sx={{ listStylePosition: "inside", height: "35vh", display: "block", overflow: "auto" }}>
      {(devices ?? []).map((d) => (
        <Item
          primary={d.name}
          key={d.device_id}
          onClick={() => navigate("device/" + d.device_id)}
        />
      ))}
    </List>
  );
}
