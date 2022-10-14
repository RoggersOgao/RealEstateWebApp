import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertProvider } from './components/context/alerts/AlertContext';
import { LoginProvider } from './components/context/auth/loginContext/LoginContext';
import { RegisterProvider } from './components/context/auth/register/RegisterContext';
import { ListingRepository } from './components/context/listing/ListingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider>
  <LoginProvider>
  <RegisterProvider>
  <ListingRepository>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ListingRepository>
  </RegisterProvider>
  </LoginProvider>
  </AlertProvider>
);

