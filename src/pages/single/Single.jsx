import React from 'react';
import './single.scss';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import wine_bottle from '../../img/wine-bottle.png';
import InfoProduct from '../../components/singleInfo/InfoProduct';
import InfoCustomer from '../../components/singleInfo/InfoCustomer';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import { customerData } from '../../datatablesource';
import { WinesContext } from '../../wineContext/WinesContextProvider';

const Single = ({ dataType }) => {
  let selectedId = useParams();

  // const [selectedItem, setSelectedItem] = useState([]);
  const { wineData } = useContext(WinesContext);

  let data;

  switch (dataType) {
    case 'product':
      data = {
        selected: wineData
          .filter((element) => {
            return element._id === selectedId.productId;
          })
          .map((item) => item),
      };
      break;
    case 'customer':
      data = {
        selected: customerData
          .filter((element) => {
            return element._id === parseInt(Object.values(selectedId));
          })
          .map((item) => item),
      };
      break;

    default:
      break;
  }

  let customerInfo = Object.values(data.selected).map((info) => (
    <>
      <InfoCustomer info={info} />
    </>
  ));
  let productInfo = Object.values(data.selected).map((info) => (
    <>
      <InfoProduct info={info} />
    </>
  ));

  useEffect(() => {
    console.log('element Selected', data.selected);
    // setSelectedItem(data.selected);
  }, []);

  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            {dataType === 'product' && <>{productInfo}</>}
            {dataType === 'customer' && <>{customerInfo}</>}
          </div>
          <div className="right">
            <Chart
              aspect={3 / 1}
              title={`sales ${dataType} ( Last 6 Months)`}
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
