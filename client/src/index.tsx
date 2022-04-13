import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SupabaseProvider } from "./components/SupabaseContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { supabase } from "./supabaseClient";
import { ReactQueryDevtools } from 'react-query/devtools';

[
  "REACT_APP_SUPABASE_URL",
  "REACT_APP_SUPABASE_PUBLIC_ANON_KEY",
  "REACT_APP_MAPBOX_ACCESS_TOKEN",
].forEach((key) => {
  if (!process.env[key]) throw new Error(`${key} is not defined!`);
});

const queryClient = new QueryClient();

const Clients = (props: { children?: JSX.Element[] | JSX.Element }) => {
  return (
    <SupabaseProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
          {props.children}
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </SupabaseProvider>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <BrowserRouter>
      <Clients>
        <App />
      </Clients> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
