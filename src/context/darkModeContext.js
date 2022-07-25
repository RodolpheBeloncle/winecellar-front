import React, { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { useSelector } from 'react-redux';
import DarkModeReducer from './darkModeReducer';

const INITIAL_STATE = {
  darkMode: false,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const darkModeState = useSelector((state) => state.user.isDarkMode);

  useEffect(() => {}, [darkModeState]);

  const [state, dispatch] = useReducer(DarkModeReducer, darkModeState);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
