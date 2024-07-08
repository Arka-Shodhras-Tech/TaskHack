import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app/App';
import {store,persistor} from '../src/redux/store/configurestore'
import './index.css';
import reportWebVitals from './reportWebVitals';
import { register } from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider toastOptions={{ defaultOptions: { position: 'bottom' } }}>
        <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>
);
reportWebVitals();
register();;