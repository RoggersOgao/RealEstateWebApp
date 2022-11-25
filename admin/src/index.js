import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertProvider } from './components/context/alerts/AlertContext';
import { ListingProvider } from './components/context/listing/ListingContext';
import { LoginProvider } from './components/context/loginContext/LoginContext';
import { MessageProvider } from './components/context/message/MessageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MessageProvider>
  <LoginProvider>
    <AlertProvider>
      <ListingProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ListingProvider>
  </AlertProvider>
  </LoginProvider>
  </MessageProvider>
);

