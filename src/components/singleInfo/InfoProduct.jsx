import React from 'react';

const InfoProduct = ({info}) => {
  return (
    <div>
      <div className="editButton">Edit</div>
      <h1 className="title">Information</h1>
      <div className="item">
        <img
          src={`http://localhost:8000/${info.img}`}
          alt="productImg"
          className="itemImg"
        />
        <div className="details">
          <h1 className="itemTitle">{info.title}</h1>
          <div className="detailItem">
            <span className="itemKey">Email:</span>
            <span className="itemValue">janedoe@gmail.com</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Phone:</span>
            <span className="itemValue">+1 2345 67 89</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Address:</span>
            <span className="itemValue">Elton St. 234 Garden Yd. NewYork</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Country:</span>
            <span className="itemValue">USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProduct;
