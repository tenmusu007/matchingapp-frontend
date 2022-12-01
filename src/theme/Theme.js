import { createTheme } from '@mui/material';

const Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#273885',
      light: '#5b62b5',
      dark: '#001357',
    },
    secondary: {
      main: '#e71d29',
      light: '#ff5e53',
      dark: '#ac0000',
    },
  },
  typography: {
    h1: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default Theme;
