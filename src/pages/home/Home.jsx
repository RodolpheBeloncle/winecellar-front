import './home.scss';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import { useEffect, useState } from 'react';
import { userRequest } from '../../utils/api';

const Home = () => {
  const [nbUsers, setNbUsers] = useState([]);
  const [usersStat, setUsersStat] = useState([]);

  // Calculate percentage difference
  const diffStatUsers = (fstVal, scdVal) => {
    const result = ((fstVal - scdVal) / (fstVal + scdVal / 2)) * 100;
    return Math.ceil(result);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await userRequest.get(`/users`);
        setNbUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getUserStats = async () => {
      try {
        const res = await userRequest.get(`/users/stats`);
        setUsersStat(res.data);
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
          <Widget type="user" nbUsers={nbUsers.length} diff={diffStatUsers(10, 11)} />
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
