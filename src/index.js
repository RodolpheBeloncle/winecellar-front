import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import WinesContextProvider from './wineContext/WinesContextProvider';
import { DarkModeContextProvider } from './context/darkModeContext';
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <WinesContextProvider>
          <DarkModeContextProvider>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </DarkModeContextProvider>
        </WinesContextProvider>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
