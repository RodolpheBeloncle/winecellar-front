import './list.scss';
import { useContext } from 'react';
import Datatable from '../../components/datatable/Datatable';
import { productColumns, userRows, userColumns } from '../../datatablesource';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import { Link } from 'react-router-dom';

const List = ({ dataType }) => {
  const { wineData } = useContext(WinesContext);

  let data;

  switch (dataType) {
    case 'customer':
      data = {
        customList: (
          <Datatable
            headersColumns={userColumns}
            nestedData={userRows}
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
