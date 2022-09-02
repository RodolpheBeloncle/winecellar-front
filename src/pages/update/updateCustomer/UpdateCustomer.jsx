import React from 'react';
import CustomerInputs from './inputsCustomer/CustomerInputs';
import emptyCustomer from '../../../img/emptyCustomer.png';

const UpdateCustomer = ({ info }) => {
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
                    src={info.img === 'NC' ? emptyCustomer : info.img}
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
            </div>
          </div>
        </div>
      </div>
      <CustomerInputs selection={info} />
    </>
  );
};

export default UpdateCustomer;
