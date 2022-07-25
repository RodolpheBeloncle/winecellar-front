import React, { useContext } from 'react';
import './home.scss';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { userRequest } from '../../utils/api';

const Home = () => {
  const { latestOrders, customersList, orderData, wineData } =
    useContext(WinesContext);
  const [monthSales, setMonthSales] = useState(0);
  const userId = useSelector((state) => state.user.userId);

  const totalSales = () => {
    if (orderData?.length > 0) {
      return orderData
        .map((sale) => sale.amount)
        .reduce((acc, value) => acc + value)
        .toFixed();
    }
    return;
  };

  const totalStockValue = () => {
    if (wineData?.length > 0) {
      return wineData
        .map((item) => item.quantity * item.price)
        .reduce((acc, value) => acc + value)
        .toFixed();
    }
    return;
  };

  const averageBottlePrice = () => {
    if (wineData?.length > 0) {
      return (
        wineData
          .map((item) => item.price)
          .reduce((acc, value) => acc + value)
          .toFixed() / wineData.length
      );
    }

    return;
  };

  let profit = totalStockValue();
  console.log('profit', profit);
  let averageBottleVariableCost = Math.round(averageBottlePrice());
  console.log('averageBottleVariableCost', averageBottleVariableCost);

  let targetProfit = Math.round(profit / averageBottleVariableCost);
  console.log('targetProfit', targetProfit);

  let actualTargetProfit = Math.round(totalSales() / averageBottleVariableCost);
  console.log(' actualProfit', actualTargetProfit);

  let diffPercentageTargetProfit = Math.round(
    100 * (actualTargetProfit / targetProfit)
  );
  console.log('diffPercentageTargetProfit', diffPercentageTargetProfit);

  const getStats = async () => {
    try {
      const res = await userRequest.get(`/orders/find/${userId}`);

      const list = res.data?.sort((a, b) => {
        return a._id - b._id;
      });

      setMonthSales(() => list[list.length - 1]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStats();
    averageBottlePrice();
    console.log('LATESORDERS', latestOrders);
    console.log('Customerlist', customersList);
  }, [latestOrders]);

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="customer" nbCustomers={customersList.length} />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured
            monthSales={monthSales}
            targetPercentage={diffPercentageTargetProfit}
          />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
         {latestOrders.length > 0 ? <div className="listTitle">Latest Transactions</div> : <div className="listTitle">No transactions to show</div>}
          <Table latestOrders={latestOrders} />
        </div>
      </div>
    </div>
  );
};

export default Home;
