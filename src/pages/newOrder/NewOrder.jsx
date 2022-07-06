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
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { WinesContext } from '../../wineContext/WinesContextProvider';

const NewOrder = () => {
  const dispatch = useDispatch();
  const { wineData, setWineData } = useContext(WinesContext);
  const [selectedId, setSelectedId] = useState([]);
  const [prevSelectedId, setPrevSelectedId] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [initQty, setInitQty] = useState({});
  const [productQty, setProductQty] = useState(0);

  const handleDelete = (id) => {
    wineData.filter((item) => item._id !== id);
  };

  const initialQty = async () => {
    const { data } = await publicRequest.get('/products/');
    data
      .filter((element) => {
        return element._id === selectedId[0];
      })
      .map((item) => {
        setSelectedProduct(item);
      });
  };

  const checkInitialQty = async () => {
    const { data } = await publicRequest.get('/products/');
    data
      .filter((element) => {
        return element._id === selectedId[0];
      })
      .map((item) => {
        setInitQty(item);
      });
  };

  const backToInitialStock = () => {
    initialQty();
    wineData
      .filter((element) => {
        return element._id === selectedId[0];
      })
      .map((item) => {
        item.quantity = selectedProduct.quantity;
        setProductQty(0);
      });
  };

  const handleQuantity = (type) => {
    if (type === 'dec') {
      wineData
        .filter((element) => {
          return element._id === selectedId[0];
        })
        .map((item) => {
          setProductQty((prevState) => prevState - 1);
          item.quantity += 1;
        });
    } else {
      wineData
        .filter((element) => {
          return element._id === selectedId[0];
        })
        .map((item) => {
          setProductQty((prevState) => prevState + 1);
          item.quantity -= 1;
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

    checkInitialQty();
  }, [selectedId]);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        setPrevSelectedId(params.row._id);
        return (
          <div className="cellAction">
            {selectedId[0] === params.row._id && (
              <>
                <div className="addContainer">
                  <div className="amountContainer">
                    <p
                      className="minus"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleQuantity('dec');
                      }}
                    >
                      -
                    </p>
                    <span type="text" className="amount">
                      {productQty}
                    </span>
                    <p
                      className="plus"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleQuantity('inc');
                      }}
                    >
                      +
                    </p>
                  </div>
                </div>
                <div className="refreshButton">
                  <RotateLeftIcon onClick={backToInitialStock} />
                </div>
              </>
            )}
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
                setProductQty(0);
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
