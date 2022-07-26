import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './privateRoute.scss';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const userAuth = useSelector((state) => state.user.currentUser);

  return userAuth ? (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
