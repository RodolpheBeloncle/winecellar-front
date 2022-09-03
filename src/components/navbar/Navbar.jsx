import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../../utils/api';
import emptyCustomer from '../../img/emptyCustomer.png';

// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
// import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../redux/apiCalls';
import { DarkModeContext } from '../../context/darkModeContext';

const Navbar = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const productsOrdered = useSelector((state) => state.cart);
  const userAuth = useSelector((state) => state.user.currentUser);
  const username = useSelector((state) => state.user.username);
  const profilPic = useSelector((state) => state.user.img);
  const userId = useSelector((state) => state.user.userId);
  const { dispatch, darkMode } = useContext(DarkModeContext);

  const handleDisconnect = () => {
    console.log('user is authenticated after logout', userAuth);
    logout(dispatcher, userAuth);
    localStorage.removeItem('persist:globalState');
  };

  const updateDarkMode = async (darkMode) => {
    try {
      await userRequest.post(`/users/switchDarkMode/${userId}`, darkMode);
    } catch (err) {
      console.log(err);
    }
  };

  const totalQuantity = () => {
    return productsOrdered.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.quantity;
    }, 0);
  };

  const onCart = () => {
    navigate('new/order');
  };

  const onProfil = () => {
    navigate('profil');
  };

  const onDashboard = () => {
    navigate('/');
  };

  useEffect(() => {
    updateDarkMode(darkMode);
    console.log('darkmode context', darkMode);
    console.log('profilpic', profilPic);

    !userAuth && navigate('/login');
  }, [userAuth, productsOrdered, darkMode, profilPic]);

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
      <input type="text" placeholder="Search..." />
      <SearchOutlinedIcon />
    </div> */}
        <div className="items">
          {/* <div className="item">
      <LanguageOutlinedIcon className="icon" />
      English
    </div> */}
          <div className="item">
            {darkMode ? (
              <LightModeOutlinedIcon
                className="darkModeIcon"
                onClick={() => dispatch({ type: 'TOGGLE' })}
              />
            ) : (
              <DarkModeOutlinedIcon
                className="darkModeIcon"
                onClick={() => dispatch({ type: 'TOGGLE' })}
              />
            )}
          </div>
          {/* <div className="item">
      <FullscreenExitOutlinedIcon className="icon" />
    </div> */}
          {/* <div className="item">
      <NotificationsNoneOutlinedIcon className="icon" />
      <div className="counter">1</div>
    </div> */}
          <div className="item">
            <ListOutlinedIcon className="dashboardIcon" onClick={onDashboard} />
          </div>
          {username && <div className="item">Welcome {username}</div>}
          <div className="item" onClick={onProfil}>
            <img
              src={
                profilPic
                  ? profilPic
                  : `https://cdn-icons-png.flaticon.com/512/149/149071.png`
              }
              alt=""
              className="avatar"
            />
          </div>
          {totalQuantity() > 0 && (
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
          )}
          <div className="item">
            <LogoutIcon onClick={handleDisconnect} className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
