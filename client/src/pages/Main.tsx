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

export function MainPage() {
  const navigate = useNavigate();
  const { user } = Auth.useUser();
  const [dataLayer, setDataLayer] = useState("aqi");

  let loggedIn = !!user;

  const testData = [
    {
      lat: -6.581689428,
      lng: 10.142188214,
      val: -81.7074561647786,
      timestamp: "2022-03-11T20:54:46.653193+00:00",
    },
    {
      lat: -70.581689428,
      lng: 109.142188214,
      val: 81.7074561647786,
      timestamp: "2022-03-11T20:54:46.653193+00:00",
    },
    {
      lat: -58.372630349,
      lng: 60.600565544,
      val: 92.6553129393213,
      timestamp: "2022-03-11T21:02:43.151513+00:00",
    },
    {
      lat: 11.827267157,
      lng: -29.536705535,
      val: 2.90051848436832,
      timestamp: "2022-03-11T21:06:27.980285+00:00",
    },
    {
      lat: 25.361857205,
      lng: -10.937446559,
      val: 105.481092551173,
      timestamp: "2022-03-11T21:28:23.370246+00:00",
    },
    {
      lat: 6.608465374,
      lng: -92.90058792,
      val: 17.7397718973236,
      timestamp: "2022-03-11T21:43:54.276599+00:00",
    },
    {
      lat: 0.608465374,
      lng: -92.90058792,
      val: 0,
      timestamp: "2022-03-11T21:43:54.276599+00:00",
    },
    {
      lat: -4.608465374,
      lng: -92.90058792,
      val: 50,
      timestamp: "2022-03-11T21:43:54.276599+00:00",
    },
    {
      lat: -14.608465374,
      lng: -92.90058792,
      val: 500,
      timestamp: "2022-03-11T21:43:54.276599+00:00",
    },
  ];

  const Drawer = (
    <Stack>
      <Toolbar sx={{ p: 2 }}>
        <Box alignContent="center">
          <img width="75%" src={logo} alt="Logo" />
        </Box>
      </Toolbar>
      <LayerPanel onChange={(layer) => setDataLayer(layer)} />
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

  const domain = [0, 51, 101, 151, 201, 301, 500];
  const range = ['#00e400', '#ffff00', '#ff7e00', '#ff0000', '#8b3f97', '#8b3f97', '#7e0023']

  return (
    <Sidebar drawer={Drawer}>
      <Map data={testData} legend={{ title: 'aqi', domain, range, units: '%' }}/>
    </Sidebar>
  );
}
