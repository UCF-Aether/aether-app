import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createClient as createUrqlClient, Provider as UrqlProvider } from 'urql';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

console.log(process.env.REACT_APP_GRAPHQL_URL);
['REACT_APP_GRAPHQL_URL', 'REACT_APP_SUPABASE_URL', 'REACT_APP_SUPABASE_PUBLIC_ANON_KEY'].forEach((key) => {
  if (!process.env[key]) throw new Error(`${key} is not defined!`);
});

const urqlClient = createUrqlClient({
  url: process.env.REACT_APP_GRAPHQL_URL || `http://localhost:${process.env.PORT || 4000}/graphql`,
});


ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={urqlClient}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
