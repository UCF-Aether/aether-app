import MenuIcon from "@mui/icons-material/Menu";
import { Card } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export interface SidebarProps {
  children?: JSX.Element[] | JSX.Element;
  drawerWidth?: number;
  drawer: JSX.Element;
}

export function Sidebar(props: SidebarProps) {
  const drawerWidth = props.drawerWidth ?? 280;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toolbar = (
    <AppBar style={{ pointerEvents: 'none', background: "transparent", boxShadow: "none" }}>
      <Toolbar>
        <Card style={{ pointerEvents: 'auto' }}>
          <IconButton onClick={handleDrawerToggle}>
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
          {props.drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, overflow: "auto" },
          }}
          open
        >
          {props.drawer}
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
        <Outlet />
      </Box>
    </Box>
  );
}
