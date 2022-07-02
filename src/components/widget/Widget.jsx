import { useEffect } from 'react';
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Link } from 'react-router-dom';

const Widget = ({ type, nbCustomers, diff }) => {
  let data;

  //temporary
  const amount = 100;
  // const diff = 20;

  switch (type) {
    case 'customer':
      data = {
        title: 'CUSTOMERS',
        diffStat: diff,
        amount: nbCustomers,
        isMoney: false,
        link: (
          <Link to="/users" style={{ textDecoration: 'none' }}>
            See all users
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
        amount: amount,
        isMoney: false,
        link: 'View all orders',
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
        title: 'EARNINGS',
        amount: amount,
        isMoney: true,
        link: 'View net earnings',
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
        amount: amount,
        isMoney: true,
        link: 'See details',
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
  
  useEffect(() => [nbCustomers, diff]);

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
