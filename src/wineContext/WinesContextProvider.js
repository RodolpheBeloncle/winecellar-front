import React, { createContext, useEffect, useState } from 'react';
import { publicRequest } from '../utils/api';
import axios from 'axios';

export const WinesContext = createContext();

const WinesContextProvider = ({ children }) => {
  const [wineData, setWineData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWineData = async () => {
    const res = await publicRequest.get('/products/');
    setWineData(res.data);
  };

  useEffect(() => {
    getWineData();
  }, []);

  return (
    <WinesContext.Provider
      value={{
        wineData,
        setWineData,
      }}
    >
      {children}
    </WinesContext.Provider>
  );
};

export default WinesContextProvider;
