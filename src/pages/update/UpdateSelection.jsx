import React from 'react';
import { useLocation } from 'react-router-dom';
import UpdateProduct from './updateProduct/UpdateProduct';
import UpdateCustomer from './updateCustomer/UpdateCustomer';

const UpdateSelection = ({ dataType}) => {
 
  let { state } = useLocation();
  let data;

  switch (dataType) {
    case 'customer':
      data = {
        updateSelection: <UpdateCustomer info={state} />,
      };
      break;
    case 'product':
      data = {
        updateSelection: <UpdateProduct info={state} />,
      };
      break;

    default:
      break;
  }

  return (
    <div className="list">
      <div className="listContainer">{data.updateSelection}</div>
    </div>
  );
};

export default UpdateSelection;
