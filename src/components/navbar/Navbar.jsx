import './navbar.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../redux/apiCalls';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';

const Navbar = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const productsOrdered = useSelector((state) => state.cart);
  const userAuth = useSelector((state) => state.user.currentUser);
  const { dispatch } = useContext(DarkModeContext);

  const handleDisconnect = () => {
    console.log('user is authenticated after logout', userAuth);
    logout(dispatcher, userAuth);
    localStorage.removeItem('persist:globalState');
  };

  const totalQuantity = () => {
    return productsOrdered.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.quantity;
    }, 0);
  };

  const onCart = () => {
    navigate('new/order');
  };

  useEffect(() => {
    !userAuth && navigate('/login');
  }, [userAuth, productsOrdered]);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: 'TOGGLE' })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt=""
              className="avatar"
            />
          </div>
          <div className="item" onClick={onCart}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1007/1007908.png"
              alt=""
              className="avatar"
            />
            {totalQuantity() > 0 && (
              <div className="counter">{totalQuantity()}</div>
            )}
          </div>
          <div className="item">
            <LogoutIcon onClick={handleDisconnect} className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
