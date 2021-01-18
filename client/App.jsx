import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RRouter } from './Router';
import { store, persistor } from './store/store';

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RRouter />
    </PersistGate>
  </Provider>
);
