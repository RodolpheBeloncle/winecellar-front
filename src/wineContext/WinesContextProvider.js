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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = useSelector((state) => state.user.userId);

  const getWineData = async () => {
    setIsLoading(true);
    try {
      const res = await publicRequest.get('/products/');
      setWineData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err)
    }
  };

  const getOrderData = async () => {
    setIsLoading(true);
    try {
      const res = await publicRequest.get('/orders/');
      setOrderData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err)

    }
  };

  const getCustomerData = async () => {
    setIsLoading(true);
    try {
      const res = await publicRequest.get(`/customers`);
      setCustomersList(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getLatestOrders = async () => {
    setIsLoading(true);
    try {
      const res = await publicRequest.get(`/orders/latest/${userId}`);
      setLatestOrders(res.data);
      setIsLoading(false);
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
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </WinesContext.Provider>
  );
};

export default WinesContextProvider;
