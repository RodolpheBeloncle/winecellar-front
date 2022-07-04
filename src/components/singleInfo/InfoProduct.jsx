import React from 'react';

const InfoProduct = ({ info }) => {
  const totalStockValue = () => {
    let result = info.quantity * info.price;
    return result;
  };
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
            <span className="itemKey">Country:</span>
            <span className="itemValue">{info.country}</span>
          </div>
          {/* <div className="detailItem">
            <span className="itemKey">Description:</span>
            <span className="itemValue">{info.desc}</span>
          </div> */}
          <div className="detailItem">
            <span className="itemKey">type:</span>
            <span className="itemValue">{info.type}</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Quantity:</span>
            <span className="itemValue">
              {info.quantity && `${info.quantity}`}{' '}
            </span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Unit Price:</span>
            <span className="itemValue">{info.price && `${info.price}€`} </span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Stock Value:</span>
            <span className="itemValue">{`${totalStockValue()}€`} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProduct;
