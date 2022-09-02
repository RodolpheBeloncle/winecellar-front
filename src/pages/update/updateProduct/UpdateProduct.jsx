import React from 'react';
import ProductInputs from './inputsProduct/ProductInputs';
import emptyBottle from '../../../img/emptyBottle.png';

const UpdateProduct = ({ info }) => {
  return (
    <>
      <div className="single">
        <div className="singleContainer">
          <div className="top">
            <div className="left">
              <div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src={info.img === 'NC' ? emptyBottle : info.img}
                    alt="productImg"
                    className="itemImg"
                  />
                  <div className="details">
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
          </div>
        </div>
      </div>
      <ProductInputs selection={info} />
    </>
  );
};

export default UpdateProduct;
