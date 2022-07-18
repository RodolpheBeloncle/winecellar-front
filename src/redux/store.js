import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userRedux';
import cartReducer from './cartRedux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'globalState',
  version: 1,
  storage,
};

const combinedReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'cart/removeAllFromCart') {
    state.cart = undefined;
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
