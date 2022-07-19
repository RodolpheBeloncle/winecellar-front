import React, { useContext, useEffect, useState } from 'react';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import Search from '../search/Search';
import { publicRequest } from '../../utils/api';
import { formatDate } from '../../utils/formatDate';
import './orderTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const List = () => {
  let optionsDate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const getOrderData = async () => {
    const res = await publicRequest.get('/orders/');
    setOrderData(res.data);
  };

  const { orderData, setOrderData } = useContext(WinesContext);
  const [searchText, setSearchText] = useState('');

  // exclude column list from filter
  const excludeColumns = ['_id', 'userId', 'createdAt', 'updatedAt'];

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') {
      getOrderData();
    } else {
      const filteredData = orderData.filter((item) => {
        return Object.keys(item)?.some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setOrderData(filteredData);
    }
  };

  useEffect(() => {
    filterData(searchText);

    console.log('orderData', orderData);
  }, [searchText]);

  return (
    <>
      <TableContainer component={Paper} className="table">
        <div className="datatableTitle">
          Create New Order
          <Link to={`/orders/new`} className="link">
            Create New
          </Link>
        </div>
        <Search
          data={orderData}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <div className="clearboth"></div>
        {orderData.length === 0 && <span>No records found to display!</span>}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Customer</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              {/* <TableCell className="tableCell">Payment Method</TableCell> */}
              {/* <TableCell className="tableCell">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">
                  {row._id.slice(5, 9)}
                </TableCell>
                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">
                  {formatDate(row.createdAt)}
                </TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                {/* <TableCell className="tableCell">{row.method}</TableCell> */}
                <TableCell className="tableCell">
                  {/* <span className={`status ${row.status}`}>{row.status}</span> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
