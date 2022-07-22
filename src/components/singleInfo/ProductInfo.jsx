import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './single.scss';

const ProductInfo = ({ info }) => {
  useEffect(() => [info]);

  return (
    <div>
      <div key={info._id}>
        <div className="editButton">
          <Link to={`/products/update/${info._id}`} state={info}>
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
            alt="productImg"
            className="itemImg"
          />
          <div className="details">
            <h1 className="itemTitle">{info.title}</h1>
            {info.country && (
              <div className="detailItem">
                <span className="itemKey">Country:</span>
                <span className="itemValue">{info.country}</span>
              </div>
            )}
            {info.content && (
              <div className="detailItem">
                <span className="itemKey">Content:</span>
                <span className="itemValue">{info.content}</span>
              </div>
            )}
            {info.desc && (
              <div className="detailItem">
                <span className="itemKey">Description:</span>
                <span className="itemValue">{info.desc}</span>
              </div>
            )}
            {info.type && (
              <div className="detailItem">
                <span className="itemKey">type:</span>
                <span className="itemValue">{info.type}</span>
              </div>
            )}
            <div className="detailItem">
              <span className="itemKey">Quantity:</span>
              <span className="itemValue">
                {info.quantity > 0 ? info.quantity : 'outOfStock'}
              </span>
            </div>
            {info.price && (
              <div className="detailItem">
                <span className="itemKey">Unit Price:</span>
                <span className="itemValue">{info.price}€</span>
              </div>
            )}
            <div className="detailItem">
              <span className="itemKey">Stock Value:</span>
              <span className="itemValue">
                {`${info.price * info.quantity}€`}{' '}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
