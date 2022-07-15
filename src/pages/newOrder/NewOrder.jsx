import React, { useContext, useEffect, useState } from 'react';
import './newOrder.scss';
import '../../components/datatable/datatable.scss';

import {
  addItemToCart,
  removeItemFromCart,
  addQuantityToItem,
  subtractQuantityFromItem,
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
  const orderedList = useSelector((state) => state.cart);
  // const [orderCartList, setOrderCartList] = useState([]);
  const { wineData, setWineData } = useContext(WinesContext);
  const [selectedId, setSelectedId] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productQty, setProductQty] = useState(0);

  const isOrdered = (id) => {
    let data = orderedList.find((item) => id === item._id);
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  const initialQty = async () => {
    const { data } = await publicRequest.get('/products/');
    setWineData(data);
    dispatch(removeItemFromCart());
  };

  // const checkInitialQty = async () => {
  //   const { data } = await publicRequest.get('/products/');
  //   data
  //     .filter((element) => {
  //       return element._id === selectedId[0];
  //     })
  //     .map((item) => {
  //       setInitQty(item);
  //     });
  // };

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
      setProductQty((prevState) => prevState - 1);
      wineData
        .filter((element) => {
          return element._id === selectedId[0];
        })
        .map((item) => {
          item.quantity += 1;
          // handleQuantityDecrease();
        });
    } else {
      setProductQty((prevState) => prevState + 1);
      wineData
        .filter((element) => {
          return element._id === selectedId[0];
        })
        .map((item) => {
          item.quantity -= 1;
          // handleQuantityIncrease();
        });
    }
  };

  // const handleClick = () => {
  //   dispatch(
  //     addProduct({ ...selectedProduct, quantity: selectedProduct.quantity })
  //   );
  // };
  // ============TEST=================

  // const handleQuantityIncrease = () => {
  //   const newOrders = [...orderCartList];
  //   if (newOrders.some((product) => product._id === selectedProduct._id)) {
  //     // const findIdx = newOrders.findIndex((product) => {
  //     //   return product._id === selectedProduct._id;
  //     // });
  //     newOrders
  //       .filter((product) => product._id === selectedProduct._id)
  //       .map((product) => [
  //         ...newOrders,
  //         { ...product, quantity: (product.quantity += 1) },
  //       ]);

  //     // newOrders[findIdx].quantity += 1;

  //     setOrderCartList(newOrders);
  //     dispatch(increaseQtyProduct({ orderCartList: orderCartList }));
  //   } else {
  //     const newOrder = {
  //       ...selectedProduct,
  //       quantity: 1,
  //     };

  //     dispatch(
  //       addProduct({
  //         ...selectedProduct,
  //         quantity: 1,
  //       })
  //     );

  //     const newOrders = [...orderCartList, newOrder];

  //     setOrderCartList(newOrders);
  //   }
  // };

  // const handleQuantityDecrease = () => {
  //   const newOrders = [...orderCartList];

  //   if (newOrders.some((product) => product._id === selectedProduct._id)) {
  //     // const findIdx = newOrders.findIndex((product) => {
  //     //   return product._id === selectedProduct._id;
  //     // });
  //     // newOrders[findIdx].quantity -= 1;

  //     newOrders
  //       .filter((product) => product._id === selectedProduct._id)
  //       .map((product) => [
  //         ...newOrders,
  //         { ...product, quantity: (product.quantity -= 1) },
  //       ]);

  //     dispatch(decreaseQtyProduct({ orderCartList: orderCartList }));
  //   }
  // };

  // ===========TEST===============
  useEffect(() => {
    console.log('selectedroduct', selectedProduct);
    console.log(' orderedList', orderedList);
    console.log('selectedId[0]', selectedId[0]);
    // console.log('productQuantity',productQty);
  }, [selectedId[0], orderedList, selectedProduct]);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
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
                        isOrdered(selectedId[0]) &&
                          dispatch(subtractQuantityFromItem(selectedId[0]));
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
                      {isOrdered(selectedId[0])
                        ? orderedList
                            .filter((element) => element._id === selectedId[0])
                            .map((product) => product.quantity)
                        : productQty}
                    </span>
                    <p
                      className="plus"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleQuantity('inc');

                        isOrdered(selectedId[0])
                          ? dispatch(addQuantityToItem(selectedProduct))
                          : dispatch(addItemToCart(selectedProduct));
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
                setSelectedId(ids);

                wineData
                  .filter((element) => {
                    return element._id === ids[0];
                  })
                  .map((item) =>
                    setSelectedProduct({
                      price: item.price,
                      title: item.title,
                      img: item.img,
                      quantity: 1,
                      _id: item._id,
                    })
                  );

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
