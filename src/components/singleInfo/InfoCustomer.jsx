import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './single.scss';

const InfoCustomer = ({ info }) => {
  useEffect(() => [info]);
  return (
    <div>
      <div className="editButton">
        <Link to={`/customers/update/${info._id}`} state={info}>
          <span>Update</span>
        </Link>
      </div>
      <h1 className="title">Information</h1>
      <div className="item">
        <img
          src={
            info.img
              ? info.img
              : `https://cdn-icons-png.flaticon.com/512/149/149071.png`
          }
          alt="CustomerImg"
          className="itemImg"
        />
        <div className="details">
          <h1 className="itemTitle">{info.customer}</h1>
          <div className="detailItem">
            <span className="itemKey">Email:</span>
            <span className="itemValue">{info.email}</span>
          </div>
          {info.phone && (
            <div className="detailItem">
              <span className="itemKey">Phone:</span>
              <span className="itemValue">{info.phone}</span>
            </div>
          )}
          {info.adress && (
            <div className="detailItem">
              <span className="itemKey">Address:</span>
              <span className="itemValue">{info.adress}</span>
            </div>
          )}
          {info.country && (
            <div className="detailItem">
              <span className="itemKey">Country:</span>
              <span className="itemValue">{info.country}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCustomer;
