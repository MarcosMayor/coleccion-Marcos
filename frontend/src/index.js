import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import store from './store/index'


//Marcos Mayor Lorenzo
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d85d00',
    },
    secondary: {
      main: '#8d6e63',
    },
    background: {
      default: '#f7a3a3',
      paper: '#a3f7f7',
    },
    error: {
      main: '#ff0000',
    },
  },
  typography: {
    fontFamily: 'Oswald',
    fontSize: 18,
    htmlFontSize: 20,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
  </ThemeProvider>
</React.StrictMode >
);
