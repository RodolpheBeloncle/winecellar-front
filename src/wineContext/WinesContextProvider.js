import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { publicRequest } from '../utils/api';

export const WinesContext = createContext();

const WinesContextProvider = ({ children }) => {
  const [wineData, setWineData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.userId);

  const getWineData = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get('/products/');
      setWineData(res.data);
    } catch (err) {}
  };

  const getOrderData = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get('/orders/');
      setOrderData(res.data);
      setLoading(false);
    } catch (err) {}
  };

  const getLatestOrders = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get(`/orders/latest/${userId}`);
      setLatestOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWineData();
    getOrderData();
    getLatestOrders();
  }, [userId]);

  return (
    <WinesContext.Provider
      value={{
        wineData,
        setWineData,
        orderData,
        setOrderData,
        latestOrders,
        setLatestOrders,
      }}
    >
      {children}
    </WinesContext.Provider>
  );
};

export default WinesContextProvider;
