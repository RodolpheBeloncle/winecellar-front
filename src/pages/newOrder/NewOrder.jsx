import './newOrder.scss';
import '../../components/datatable/datatable.scss';
import { useContext, useEffect, useState } from 'react';
import InfoProduct from '../../components/singleInfo/InfoProduct';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { productColumns } from '../../datatablesource';
import { WinesContext } from '../../wineContext/WinesContextProvider';

const NewOrder = () => {
  const { wineData } = useContext(WinesContext);
  const [selectedId, setSelectedId] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleDelete = (id) => {
    wineData.filter((item) => item._id !== id);
  };

  let dataSelected = {
    _id: 9,
    title: 'Roxie',
    type: 'rosé',
    img: 'uploads/img/fe8eed6cbbf6f9bd705d6e2ea29c6548',
    country: 'France',
    quantity: 1,
    price: 65,
  };

  useEffect(() => {
    wineData
      .filter((element) => {
        return element._id === selectedId[0];
      })
      .map((item) => setSelectedProduct(item));
  }, [selectedId]);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton"> + 8 - </div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="newOrder">
      <div className="newOrderContainer">
        <div className="top">
          <div className="left">
            <InfoProduct info={selectedProduct} />
          </div>
          {/* <div className="right">
==== shopping car increase or decrease amount product
            <Chart
              aspect={3 / 1}
              title={`sales ${dataType} ( Last 6 Months)`}
            />
          </div> */}
        </div>
        <div className="bottom">
          <h1 className="title">Create Order</h1>
          <div className="datatable">
            <DataGrid
              className="datagrid"
              getRowId={(r) => r._id}
              rows={wineData}
              columns={productColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              onSelectionModelChange={(ids) => {
                console.log(ids);
                setSelectedId(ids);
              }}
              selectionModel={selectedId}
              // checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
