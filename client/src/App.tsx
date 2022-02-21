// import logo from "./logo.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { useMemo, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import { ColorModeContext } from './components/ColorModeContext';
import { Sidebar } from "./components/Sidebar";
import { SupabaseProvider } from "./components/SupabaseContext";
import { LoginSignup } from "./pages/LoginSignup";
import { Dashboard } from './pages/Dashboard';
import { DataMap } from './components/Map';

const supabaseClient = createSupabaseClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_PUBLIC_ANON_KEY!
);
console.log(supabaseClient);

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <SupabaseProvider supabaseClient={supabaseClient} >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Routes>
              <Route path='/' element={<Sidebar />}>
                <Route index element={<DataMap />} />
              </Route>
              <Route path='/auth' element={<LoginSignup />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SupabaseProvider>
  );
}
