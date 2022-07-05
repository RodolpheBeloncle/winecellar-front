import './newOrder.scss';
import '../../components/datatable/datatable.scss';
import { useContext, useEffect, useState } from 'react';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from 'react-redux';
import InfoProduct from '../../components/singleInfo/InfoProduct';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { publicRequest } from '../../utils/api';
import { productColumns } from '../../datatablesource';
import { WinesContext } from '../../wineContext/WinesContextProvider';

const NewOrder = () => {
  const dispatch = useDispatch();
  const { wineData, setWineData } = useContext(WinesContext);
  const [selectedId, setSelectedId] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productQty,setProductQty] = useState(0);

  const handleDelete = (id) => {
    wineData.filter((item) => item._id !== id);
  };

  const handleQuantity = (type) => {
    if (type === 'dec') {
      wineData
        .filter((element) => {
          return element._id === selectedId[0];
        })
        .map((item) => {
          if (item.quantity > 0) {
            item.quantity -= 1;
            setProductQty(item.quantity)
          }
          setSelectedProduct(item);
        });
    } else {
      wineData
        .filter((element) => {
          return element._id === selectedId[0];
        })
        .map((item) => {
          item.quantity += 1;
          setProductQty(item.quantity)
          setSelectedProduct(item);
        });
    }
  };

  // const handleClick = () => {
  //   dispatch(addProduct({ ...selectedProduct, quantity }));
  // };

  useEffect(() => {
    wineData
      .filter((element) => {
        return element._id === selectedId[0];
      })
      .map((item) => {
        setSelectedProduct(item);
      });

    //   function setArrayElement(array, index, value) {
    //     array = array.slice();
    //     array[index] = value;
    //     return array;
    // }
  }, [selectedId]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get('/products/find/' + selectedId[0]);
        setWineData(res.data);
      } catch {}
    };

    getProduct();
  }, []);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {selectedId[0] === params.row._id && (
              <div className="addContainer">
                <div className="amountContainer">
                  <p
                    className="minus"
                    onClick={() => {
                      handleQuantity('dec');
                    }}
                  >
                    -
                  </p>
                  <span type="text" className="amount">
                    {params.row.quantity}
                  </span>
                  <p
                    className="plus"
                    onClick={() => {
                      handleQuantity('inc', params);
                    }}
                  >
                    +
                  </p>
                </div>
              </div>
            )}
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
            {selectedId.length > 0 && <InfoProduct info={selectedProduct} />}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
