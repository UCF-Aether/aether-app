import MenuIcon from "@mui/icons-material/Menu";
import { Card, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Auth } from "@supabase/ui";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../aether.png";
import { ColorModeToggle } from "./ColorModeToggle";
import { Map } from "./map/Map";
import { LayerPanel } from "./panels/LayerPanel";
import { LoginSignupPanel } from "./panels/LoginSignupPanel";
import { NodePanel } from "./panels/NodePanel";
import { YouPanel } from "./panels/YouPanel";

const drawerWidth = 280;

// TODO: implement authentication
// This is temporary - testing only
let loggedIn = false;

export interface SidebarProps {
  children?: JSX.Element[] | JSX.Element;
  setLayer?: (layer: string) => void;
}

export function Main() {
  const navigate = useNavigate();
  const { user } = Auth.useUser();
  const [ dataLayer, setDataLayer ] = useState('aqi');

  loggedIn = !!user;
  // console.log(user);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Stack>
      <Toolbar sx={{ p: 2 }}>
        <Box alignContent='center'>
          <img width="75%" src={logo} alt="Logo" />
        </Box>
      </Toolbar>
      <LayerPanel onChange={ layer => setDataLayer(layer) }/>
      {
        loggedIn ? (
          <>
            <NodePanel />
            <YouPanel dashboardOnClick={() => navigate('/dashboard')} />
          </>
        ) : (
          <>
            <LoginSignupPanel />
          </>
        )
      }
      <ColorModeToggle />
    </Stack>
  );

  const toolbar = (
    <AppBar style={{ pointerEvents: 'none', background: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Card>
          <IconButton
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Card>
      </Toolbar>
    </AppBar>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {toolbar}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, overflow: 'auto' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        height="100vh"
        display="flex"
        flexDirection="column"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Map chan={dataLayer} />
        <Outlet />
      </Box>
    </Box>
  );
}
