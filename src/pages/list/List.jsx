import React from 'react';
import './list.scss';
import { useContext, useEffect } from 'react';
import Datatable from '../../components/datatable/Datatable';
import { publicRequest, userRequest } from '../../utils/api';
import {
  productColumns,
  customerData,
  customerColumns,
} from '../../datatablesource';
import { WinesContext } from '../../wineContext/WinesContextProvider';

const List = ({ dataType }) => {
  const { wineData, setWineData } = useContext(WinesContext);

  const getWineData = async () => {
    try {
      const res = await publicRequest.get('/products/');
      setWineData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/products/${id}`);
      getWineData();
      alert(`product deleted`);
    } catch (err) {
      console.log(err);
    }
  };

  let data;

  switch (dataType) {
    case 'customer':
      data = {
        customList: (
          <Datatable
            headersColumns={customerColumns}
            nestedData={customerData}
            title={dataType}
          />
        ),
      };
      break;
    case 'product':
      data = {
        customList: (
          <Datatable
            headersColumns={productColumns}
            nestedData={wineData}
            refreshData={getWineData}
            handleDelete={handleDelete}
            title={dataType}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className="list">
      <div className="listContainer">{data.customList}</div>
    </div>
  );
};

export default List;
