import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from 'react-dom/client';
import { persistor, store } from './redux/store.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
      </PersistGate>
      <App />
    </Provider>
  </React.StrictMode>
);
