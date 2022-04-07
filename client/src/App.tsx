// import logo from "./logo.svg";
import { createTheme, LinkProps as MuiLinkProps, ThemeProvider } from "@mui/material";
import { forwardRef, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Link, LinkProps, Route, Routes } from "react-router-dom";
import "./App.css";
import { ColorModeContext } from "./components/ColorModeContext";
import { DeviceDetailsModal } from "./components/DeviceDetailsModal";
import { GatewayDetailsModal } from "./components/GatewayDetailsModal";
import { SupabaseProvider } from "./components/SupabaseContext";
import { Dashboard } from "./pages/Dashboard";
import { LoginSignup } from "./pages/LoginSignup";
import { MainPage } from "./pages/Main";
import { supabase } from './supabaseClient';

console.log(supabase);


const queryClient = new QueryClient();

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
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: '#F8F9FB',
              },
            }
          }
        }
      }),
    [mode]
  );

  const Clients = (props: { children?: JSX.Element[] | JSX.Element }) => {
    return (
      <SupabaseProvider supabaseClient={supabase}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </SupabaseProvider>
    );
  }

  const Providers = (props: { children?: JSX.Element[] | JSX.Element }) => {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={linkTheme}>
          <ThemeProvider theme={colorModeTheme}>
            {props.children}
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
            <Route path="/*" element={<MainPage />}>
              <Route path="device/:deviceId" element={<DeviceDetailsModal />} />
              <Route path="gateway/:gatewayId" element={<GatewayDetailsModal />} />
            </Route>
            <Route path="/auth" element={<LoginSignup />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </div>
      </Providers>
    </Clients>
  );
}
