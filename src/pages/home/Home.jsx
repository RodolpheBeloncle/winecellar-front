import './home.scss';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import { useEffect, useState } from 'react';
import { userRequest } from '../../utils/api';

const Home = () => {
  const [nbCustomers, setNbCustomers] = useState([]);
  const [customersStat, setCustomersStat] = useState(null);

  // Calculate users % range betwwen last 2 months
  const diffStatCustomers = (lstMonth, prvMonth) => {
    const result = ((lstMonth - prvMonth) / (lstMonth + prvMonth / 2)) * 100;
    return Math.ceil(result);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await userRequest.get(`/users`);
        setNbCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getUserStats = async () => {
      try {
        const res = await userRequest.get(`/users/stats`);
        let customersStats = diffStatCustomers(res.data[0].total,res.data[1].total)
        setCustomersStat(customersStats);
      } catch (err) {
        console.log(err);
      }
    };

    getAllUsers();
    getUserStats();
  }, []);

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget
            type="customer"
            nbCustomers={nbCustomers.length}
            diff={customersStat}
          />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
