import React, { createContext, useEffect, useState } from 'react';
import { publicRequest } from '../utils/api';

export const WinesContext = createContext();

const WinesContextProvider = ({ children }) => {
  const [wineData, setWineData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWineData = async () => {
    const res = await publicRequest.get('/products/');
    setWineData(res.data);
  };

  const getOrderData = async () => {
    const res = await publicRequest.get('/orders/');
    setOrderData(res.data);
  };

  useEffect(() => {
    getWineData();
    getOrderData();
  }, []);

  return (
    <WinesContext.Provider
      value={{
        wineData,
        setWineData,
        orderData,
        setOrderData,
      }}
    >
      {children}
    </WinesContext.Provider>
  );
};

export default WinesContextProvider;
