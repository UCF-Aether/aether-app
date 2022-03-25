import { Box, Stack, Toolbar } from "@mui/material";
import { Auth } from "@supabase/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../aether.png";
import { ColorModeToggle } from "../components/ColorModeToggle";
import { ColorDomain, Map } from "../components/map/Map";
import { LayerPanel } from "../components/panels/LayerPanel";
import { LoginSignupPanel } from "../components/panels/LoginSignupPanel";
import { NodePanel } from "../components/panels/NodePanel";
import { YouPanel } from "../components/panels/YouPanel";
import { Sidebar } from "../components/Sidebar";
import { useLayer, LayerType } from "../layers";

// https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf

export function MainPage() {
  const navigate = useNavigate();
  const { user } = Auth.useUser();
  const [layer, setLayer] = useState<LayerType>("RAW_AQI");
  const { domain, range, title, units, readings, queryLayer } = useLayer(layer);

  let loggedIn = !!user;

  const Drawer = (
    <Stack>
      <Toolbar sx={{ p: 2 }}>
        <Box alignContent="center">
          <img width="75%" src={logo} alt="Logo" />
        </Box>
      </Toolbar>
      <LayerPanel value={layer} onChange={(newLayer) => setLayer(newLayer)} />
      {loggedIn ? (
        <>
          <NodePanel />
          <YouPanel dashboardOnClick={() => navigate("/dashboard")} />
        </>
      ) : (
        <>
          <LoginSignupPanel />
        </>
      )}
      <ColorModeToggle />
    </Stack>
  );

  return (
    <Sidebar drawer={Drawer}>
      <Map data={readings} legend={{ title, domain, range, units }}/>
    </Sidebar>
  );
}
