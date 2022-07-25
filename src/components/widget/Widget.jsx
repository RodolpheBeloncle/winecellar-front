import React, { useEffect, useContext } from 'react';
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Link } from 'react-router-dom';

const Widget = ({ type, nbCustomers}) => {
  const { orderData, wineData } = useContext(WinesContext);
  let data;

  const totalSales = () => {
    if (orderData.length > 0) {
      return orderData
        .map((sale) => sale.amount)
        .reduce((acc, value) => acc + value)
        .toFixed();
    }
    return;
  };

  const totalStockValue = () => {
    if (wineData.length > 0) {
      return wineData
        .map((item) => item.quantity * item.price)
        .reduce((acc, value) => acc + value)
        .toFixed();
    }
    return;
  };

  let orderAmount = orderData.length;

  useEffect(() => {
    console.log('OrderData', orderData);
  }, []);

  switch (type) {
    case 'customer':
      data = {
        title: 'CUSTOMERS',
        // diffStat: diff,
        amount: nbCustomers,
        isMoney: false,
        link: (
          <Link to="/customers" className="widget-link">
            View customers
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }}
          />
        ),
      };
      break;
    case 'order':
      data = {
        title: 'ORDERS',
        amount: orderAmount,
        isMoney: false,
        link: (
          <Link to="/orders" className="widget-link">
            View orders
          </Link>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      };
      break;
    case 'earning':
      data = {
        title: 'SALES',
        amount: totalSales() ? totalSales() : 0,
        isMoney: true,
        link: (
          <Link to="/products" className="widget-link">
            View products
          </Link>
        ),
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
          />
        ),
      };
      break;
    case 'balance':
      data = {
        title: 'BALANCE',
        amount: totalSales() ? totalStockValue() - totalSales() : 0,
        isMoney: true,
        // link: 'See details',
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(128, 0, 128, 0.2)',
              color: 'purple',
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => [nbCustomers]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.amount}
          {data.isMoney && '€'}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div
          className={`percentage ${
            data.diffStat < 0 ? 'negative' : 'positive'
          }`}
        >
          {data.diffStat < 0 ? (
            <KeyboardArrowDownIcon />
          ) : data.diffStat > 0 ? (
            <KeyboardArrowUpIcon />
          ) : (
            data.diffStat === 0 && ''
          )}
          {data.diffStat ? `${data.diffStat}%` : ''}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
