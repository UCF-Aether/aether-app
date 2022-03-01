// import logo from "./logo.svg";
import { createTheme, ThemeProvider, LinkProps as MuiLinkProps } from "@mui/material";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { useMemo, useState, forwardRef } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { ColorModeContext } from "./components/ColorModeContext";
import { Sidebar } from "./components/Sidebar";
import { SupabaseProvider } from "./components/SupabaseContext";
import { LoginSignup } from "./pages/LoginSignup";
import { Dashboard } from "./pages/Dashboard";
import { DataMap } from "./components/Map";
import { Link, LinkProps } from "react-router-dom";
import { DeviceDetailsModal } from "./components/DeviceDetailsModal";
import { GatewayDetailsModal } from "./components/GatewayDetailsModal";
import { createClient as createUrqlClient, Provider as UrqlProvider } from "urql";
import { MapProvider } from "react-map-gl";

const supabaseClient = createSupabaseClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_PUBLIC_ANON_KEY!
);
console.log(supabaseClient);

const urqlClient = createUrqlClient({
  url: process.env.REACT_APP_GRAPHQL_URL || `http://localhost:${process.env.PORT || 4000}/graphql`,
  fetchOptions: () => {
    const token = supabaseClient.auth.session()?.access_token;
    console.log(token);

    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

// https://github.com/mui/material-ui/issues/29942
const LinkBehavior = forwardRef<any, Omit<LinkProps, "to"> & { href: LinkProps["to"] }>(
  (props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <Link ref={ref} to={href} {...other} />;
  }
);
LinkBehavior.displayName = "LinkBehavior";

const colors = {
  linkBlue: "#2C73FF",
};
const linkTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiLink: {
      defaultProps: {
        color: colors.linkBlue,
        component: LinkBehavior,
      } as MuiLinkProps, // https://github.com/mui/material-ui/issues/29942
    },
  },
});

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const colorModeTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const Main = () => (
    <Sidebar>
      <DataMap />
      <Outlet />
    </Sidebar>
  );

  const Clients = (props: { children?: JSX.Element[] | JSX.Element }) => {
    return (
      <SupabaseProvider supabaseClient={supabaseClient}>
        <UrqlProvider value={urqlClient}>
          {props.children}
        </UrqlProvider>
      </SupabaseProvider>
    );
  }

  const Providers = (props: { children?: JSX.Element[] | JSX.Element }) => {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={linkTheme}>
          <ThemeProvider theme={colorModeTheme}>
            <MapProvider>
              {props.children}
            </MapProvider>
          </ThemeProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return (
    <Clients>
      <Providers>
        <div className="App">
          <Routes>
            <Route path="/*" element={<Main />}>
              <Route path="device/:deviceId" element={<DeviceDetailsModal />} />
              <Route path="gateway/:gatewayId" element={<GatewayDetailsModal />} />
            </Route>
            <Route path="/auth" element={<LoginSignup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Providers>
    </Clients>
  );
}
