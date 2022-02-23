import MenuIcon from "@mui/icons-material/Menu";
import { Card, Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Auth } from "@supabase/ui";
import { Fragment, useEffect, useState } from "react";
import { Location, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../aether.png";
import { ColorModeToggle } from "./ColorModeToggle";
import { LayerPanel } from "./LayerPanel";
import { LoginSignupPanel } from "./LoginSignupPanel";
import { NodePanel } from "./NodePanel";
import { YouPanel } from "./YouPanel";

const drawerWidth = 280;

// TODO: implement authentication
// This is temporary - testing only
let loggedIn = false;

const drawerItems = [
  {
    route: "/",
    text: "Map",
    toolbarText: "Data Overlays",
  },
  {
    route: "/logs",
    text: "Logs",
    toolbarText: "Device Logs",
  },
];

function routeToIndex(location: Location) {
  console.log(location.pathname);
  return drawerItems.map(({ route }) => route).indexOf(location.pathname);
}

export interface SidebarProps {
  children?: JSX.Element[] | JSX.Element;
}

export function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = Auth.useUser();

  loggedIn = !!user;
  console.log(user);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(routeToIndex(location));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    route: string,
    index: number
  ) => {
    setSelectedIndex(index);
    navigate(route);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // First one is the default

  const drawer = (
    <div>
      <Toolbar sx={{ p: 2 }}>
        <Box alignContent='center'>
          <img width="75%" src={logo} alt="Logo" />
        </Box>
      </Toolbar>
      <LayerPanel />
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
    </div>
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
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
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
        {props.children}
      </Box>
    </Box>
  );
}
