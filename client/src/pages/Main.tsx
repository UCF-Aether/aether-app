import { Box, Stack, Toolbar } from "@mui/material";
import { Auth } from "@supabase/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../aether.png";
import { ColorModeToggle } from "../components/ColorModeToggle";
import { Map } from "../components/map/Map";
import { LayerPanel } from "../components/panels/LayerPanel";
import { LoginSignupPanel } from "../components/panels/LoginSignupPanel";
import { NodePanel } from "../components/panels/NodePanel";
import { YouPanel } from "../components/panels/YouPanel";
import { Sidebar } from "../components/Sidebar";

export function MainPage() {
  const navigate = useNavigate();
  const { user } = Auth.useUser();
  const [ dataLayer, setDataLayer ] = useState('aqi');

  let loggedIn = !!user;

  const Drawer = (
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

  return (
    <Sidebar drawer={Drawer} >
      <Map chan={dataLayer} />
    </Sidebar>
  );
}
