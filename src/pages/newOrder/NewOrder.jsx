import React from 'react';
import './newOrder.scss';
import '../../components/datatable/datatable.scss';
import { useContext, useEffect, useState } from 'react';
import {
  addProduct,
  decreaseProduct,
  increaseQuantityProduct,
  resetCartProduct,
} from '../../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import InfoProduct from '../../components/singleInfo/InfoProduct';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { publicRequest } from '../../utils/api';
import { productColumns } from '../../datatablesource';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { WinesContext } from '../../wineContext/WinesContextProvider';

const NewOrder = () => {
  const dispatch = useDispatch();
  const orderCart = useSelector((state) => state.cart.products);
  const [orderCartList, setOrderCartList] = useState([]);
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
          handleQuantityDecrease();
        });
    } else {
      wineData
        .filter((element) => {
          return element._id === selectedId[0];
        })
        .map((item) => {
          setProductQty((prevState) => prevState + 1);
          item.quantity -= 1;
          handleQuantityIncrease();
        });
    }
  };

  // const handleClick = () => {
  //   dispatch(
  //     addProduct({ ...selectedProduct, quantity: selectedProduct.quantity })
  //   );
  // };
  // ============TEST=================

  const handleQuantityIncrease = () => {
    const newOrders = [...orderCartList];
    if (newOrders.some((product) => product._id === selectedProduct._id)) {
      const findIdx = newOrders.findIndex((product) => {
        return product._id === selectedProduct._id;
      });

      newOrders[findIdx].quantity += 1;

      setOrderCartList(newOrders);
    } else {
      const newOrder = {
        ...selectedProduct,
        quantity: 1,
      };

      const newOrders = [...orderCartList, newOrder];

      setOrderCartList(newOrders);
    }
  };

  const handleQuantityDecrease = () => {
    const newOrders = [...orderCartList];

    if (newOrders.some((product) => product._id === selectedProduct._id)) {
      const findIdx = newOrders.findIndex((product) => {
        return product._id === selectedProduct._id;
      });
      newOrders[findIdx].quantity -= 1;
    }
    newOrders.some((product) => product.quantity === 0)
      ? setOrderCartList(
          orderCartList.filter((item) => item._id !== selectedId[0])
        )
      : setOrderCartList(newOrders);
  };

  // ===========TEST===============
  useEffect(() => {
    wineData
      .filter((element) => {
        return element._id === selectedId[0];
      })
      .map((item) => {
        setSelectedProduct(item);
      });

    orderCartList
      .filter((element) => {
        return element._id === selectedId[0];
      })
      .map((item) => {
        setProductQty(item.quantity);
      });

    checkInitialQty();
    console.log('orderCartList', orderCartList);
  }, [selectedId, orderCartList]);

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

                        if (selectedProduct.quantity >= 0 && productQty > 0) {
                          handleQuantity('dec');
                          // dispatch(decreaseProduct({ products: orderCart }));
                        }
                      }}
                    >
                      -
                    </p>
                    <span
                      type="text"
                      className="amount"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      {productQty}
                    </span>
                    <p
                      className="plus"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (selectedProduct.quantity > 0) {
                          handleQuantity('inc');

                          dispatch(
                            addProduct({
                              ...selectedProduct,
                              quantity: productQty + 1,
                            })
                          );
                        }
                      }}
                    >
                      +
                    </p>
                  </div>
                </div>
                <div className="refreshButton">
                  <RotateLeftIcon
                    onClick={() => {
                      backToInitialStock();
                      dispatch(resetCartProduct());
                    }}
                  />
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
==== shopping car increase or decrease amount current
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
