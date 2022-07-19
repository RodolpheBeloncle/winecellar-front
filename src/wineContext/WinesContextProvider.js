import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { publicRequest } from '../utils/api';
import { customerData } from '../datatablesource';

export const WinesContext = createContext();

const WinesContextProvider = ({ children }) => {
  const [wineData, setWineData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [customersList, setCustomersList] = useState([]);
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

  const getCustomerData = () => {
    // const res = await publicRequest.get('/orders/');
    setCustomersList(customerData);
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
    getCustomerData();
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
        customersList,
        setCustomersList,
      }}
    >
      {children}
    </WinesContext.Provider>
  );
};

export default WinesContextProvider;
