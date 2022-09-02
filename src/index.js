import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.scss';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import WinesContextProvider from './wineContext/WinesContextProvider';
import { DarkModeContextProvider } from './context/darkModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WinesContextProvider>
        <DarkModeContextProvider>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </DarkModeContextProvider>
      </WinesContextProvider>
    </Provider>
  </React.StrictMode>
);
