import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Theme from './theme/Theme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../src/state/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CssBaseline />
    <AuthContextProvider>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
