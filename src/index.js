import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { DarkModeContextProvider } from './context/darkModeContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
