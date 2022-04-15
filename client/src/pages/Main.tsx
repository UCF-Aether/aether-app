import { Box, Stack, Toolbar } from "@mui/material";
import { Auth } from "@supabase/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../aether.png";
import { OnlineIndicator } from "../components/icons/OnlineIndicator";
import { Map } from "../components/map/Map";
import { LayerPanel } from "../components/panels/LayerPanel";
import { LoginSignupPanel } from "../components/panels/LoginSignupPanel";
import { NodePanel } from "../components/panels/NodePanel";
import { YouPanel } from "../components/panels/YouPanel";
import { Sidebar } from "../components/Sidebar";
import { useDevices } from "../hooks/devices";
import { LayerType, useLayer, useSubscriptionStatus } from "../hooks/layers";

// https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf

export function MainPage() {
  const navigate = useNavigate();
  const { user } = Auth.useUser();
  const [layer, setLayer] = useState<LayerType>("AQI");
  const [showDevices, setShowDevices] = useState(false);
  const { domain, range, title, units, data, isLoading, isError } = useLayer(layer, {
    subscribe: true,
  });
  const { devices } = useDevices();

  let loggedIn = !!user;

  const Drawer = (
    <Stack>
      <Toolbar sx={{ p: 2, pb: 0 }}>
        <Box alignContent="center">
          <img width="75%" src={logo} alt="Logo" />
        </Box>
      </Toolbar>
      <LayerPanel value={layer} onChange={(newLayer) => setLayer(newLayer)} />
      {loggedIn ? (
        <>
          <NodePanel
            showDevices={showDevices}
            onShowDevicesChange={() => setShowDevices(!showDevices)}
          />
          <YouPanel dashboardOnClick={() => navigate("/dashboard")} />
        </>
      ) : (
        <>
          <LoginSignupPanel />
        </>
      )}
    </Stack>
  );

  return (
    <Sidebar drawer={Drawer}>
      <Map
        readings={data}
        devices={devices}
        showDevices={showDevices}
        isLoading={isLoading}
        isError={isError}
        legend={{ title, domain, range, units }}
      />
      <OnlineIndicator online={useSubscriptionStatus()} />
    </Sidebar>
  );
}
