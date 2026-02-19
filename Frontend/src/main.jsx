import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from "react-redux";
import store from "./redux/store";

// REDUX PERSIST IMPORTS
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// Create the persistor
let persistor = persistStore(store);

// Professional Color Palette: Organic Green and Fresh Orange
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3d00', // Deep Orange-Red (Modern & Energetic)
    },
    secondary: {
      main: '#ff9100', // Bright Amber (For accents)
    },
    background: {
      default: '#fafafa', // Soft off-white for a clean look
    }
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', // Clean modern font
  },
  shape: {
    borderRadius: 12, // Modern rounded corners everywhere
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* PersistGate delays the rendering of the UI until your persisted state has been retrieved */}
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)