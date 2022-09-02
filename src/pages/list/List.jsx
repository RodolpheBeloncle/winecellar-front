import React, { useEffect } from 'react';
import './list.scss';
import { useContext } from 'react';
import Datatable from '../../components/datatable/Datatable';
import { publicRequest, userRequest } from '../../utils/api';
import { productColumns, customerColumns } from '../../datatablesource';
import { useSelector } from 'react-redux';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import Swal from 'sweetalert2';

const List = ({ dataType }) => {
  const {
    wineData,
    setCustomersList,
    customersList,
    setWineData,
    isLoading,
    setIsLoading,
  } = useContext(WinesContext);
  const userId = useSelector((state) => state.user.userId);

  const getWineData = async () => {
    try {
      const res = await publicRequest.get(`/products/${userId}`);
      setWineData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCustomerData = async () => {
    try {
      const res = await publicRequest.get(`/customers/${userId}`);
      setCustomersList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveProduct = async (id) => {
    setIsLoading(true);
    try {
      await userRequest.delete(`/products/${id}`).then(() => {
        getWineData();
        setIsLoading(false);
        Swal.fire({
          title: `product removed`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      });
    } catch (err) {
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err}`,
        // footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  const handleRemoveCustomer = async (id) => {
   
    setIsLoading(true);
    try {
      await userRequest.delete(`/customers/${id}`).then(() => {
        getCustomerData();
        setIsLoading(false);
        Swal.fire({
          title: `customer removed`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err)
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: `${err}`,
      //   // footer: '<a href="">Why do I have this issue?</a>',
      // });
    }
  };

  let data;

  switch (dataType) {
    case 'customer':
      data = {
        customList: (
          <Datatable
            isLoading={isLoading}
            headersColumns={customerColumns}
            nestedData={customersList}
            handleRemove={handleRemoveCustomer}
            refreshData={getCustomerData}
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
            handleRemove={handleRemoveProduct}
            refreshData={getWineData}
            title={dataType}
          />
        ),
      };
      break;

    default:
      break;
  }

  // useEffect(() => {console.log('userId', userId)},[userId]);

  return (
    <div className="list">
      <div className="listContainer">{data.customList}</div>
    </div>
  );
};

export default List;
