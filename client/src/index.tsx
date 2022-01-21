import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataMap } from "./components/Map";
import LogTable from "./components/LogTable";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<DataMap />} />
          <Route path="logs" element={<LogTable />} />
        </Route>
          
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
