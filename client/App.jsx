import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from './Router';
import { store, persistor } from './store/store';
import { AuthProvider } from './store/users/AuthContext';

export const App = () => (
  <AuthProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </AuthProvider>
);
