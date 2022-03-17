import { Box, IconButton, List, ListItemButton, ListItemText, Stack } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useState } from "react";

const dashy = [
  {
    text: "Overview",
    icon: null,
    key: "",
  },
  {
    text: "Devices",
    icon: null,
    key: "devices",
  },
  {
    text: "Gateways",
    icon: null,
    key: "gateways",
  },
  {
    text: "Alerts",
    icon: null,
    key: "alerts",
  },
  {
    text: "Your Account",
    icon: null,
    key: "account",
  },
];

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState(() => {
    // TODO: replace with regex LOL
    const key = location.pathname.split("dashboard")[1].split("/").splice(1)[0] ?? "";
    const selectedObj = dashy.find((d) => d.key === key);
    return selectedObj?.key ?? "";
  });

  const handleSelect = (key: string) => {
    setSelected(key);
    navigate(key);
  };

  const Drawer = (
    <Stack>
      <Box sx={{ my: 2 }}>
        <IconButton onClick={() => navigate("/")}>
          <KeyboardBackspaceIcon fontSize="large" />
        </IconButton>
      </Box>
      <List>
        {dashy.map((d) => (
          <ListItemButton
            selected={d.key === selected}
            key={d.key}
            onClick={() => handleSelect(d.key)}
          >
            {d.icon ?? <></>}
            <ListItemText primary={d.text} />
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );

  return (
    <Sidebar drawer={Drawer}>
    </Sidebar>
  );
}
