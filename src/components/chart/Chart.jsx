import React from 'react';
import './chart.scss';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../utils/api';
import { useSelector } from 'react-redux';

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ aspect, title, month }) => {
  const userId = useSelector((state) => state.user.userId);
  const [dataChart, setDataChart] = useState([]);
  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${userId}`);
        console.log('chart userId', userId);

        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });

        list.map((item) =>
          setDataChart((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Total: item.Total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };

    getStats();
    
  }, [MONTHS]);
  console.log("dataChart",dataChart);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      
      <ResponsiveContainer width="100%" aspect={aspect}>
      {dataChart.length > 0 ?
        <AreaChart
          width={730}
          height={250}
          data={dataChart}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart> : <p>No data stat to show</p>}
      </ResponsiveContainer>
    </div> 
  );
};

export default Chart;
