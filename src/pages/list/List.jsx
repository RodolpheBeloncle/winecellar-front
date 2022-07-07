import React from 'react';
import './list.scss';
import { useContext, useEffect } from 'react';
import Datatable from '../../components/datatable/Datatable';
import { publicRequest } from '../../utils/api';
import {
  productColumns,
  customerData,
  customerColumns,
} from '../../datatablesource';
import { WinesContext } from '../../wineContext/WinesContextProvider';

const List = ({ dataType }) => {
  const { wineData, setWineData } = useContext(WinesContext);

  const getWineData = async () => {
    const res = await publicRequest.get('/products/');
    setWineData(res.data);
  };

  useEffect(() => {
    getWineData();
  }, []);

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
