import React from 'react';
import { Link } from 'react-router-dom';
import emptyProduct from '../../img/emptyBottle.png';

const InfoProduct = ({ selectedId, wineData }) => {

  return (
    <div>
      {wineData
        .filter((element) => element._id === selectedId[0])
        .map((info) => (
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
                  info.img === "NC"
                    ? emptyProduct
                    : info.img
                }
                alt="ProductImg"
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
               
                  <div className="detailItem">
                    <span className="itemKey">Unit Price:</span>
                    <span className="itemValue">{info.price === 0 ? "No price provided" : `${info.price}€`}</span>
                  </div>
            
                <div className="detailItem">
                  <span className="itemKey">Stock Value:</span>
                  <span className="itemValue">
                    {`${info.price * info.quantity}€`}{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default InfoProduct;
