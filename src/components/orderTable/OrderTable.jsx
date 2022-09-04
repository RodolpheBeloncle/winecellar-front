import React, { useContext, useEffect, useState } from 'react';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import Search from '../search/Search';
import { publicRequest, userRequest } from '../../utils/api';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/formatDate';
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, Grid } from '@material-ui/core';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '5px',
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'start',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
}));

const List = () => {
  const classes = useStyles();
  const userId = useSelector((state) => state.user.userId);

  const getOrderData = async () => {
    const res = await publicRequest.get(`/orders/${userId}`);
    setOrderData(res.data);
  };

  const { orderData, setOrderData, isLoading, setIsLoading } =
    useContext(WinesContext);
  const [searchText, setSearchText] = useState('');

  const handleRemoveOrder = async (id) => {
    setIsLoading(true);
    try {
      await userRequest.delete(`/orders/${id}`);
      getOrderData();
      setIsLoading(false);
      Swal.fire({
        title: `order removed`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err}`,
        // footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

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

    console.log('orderTable', orderData);
  }, [searchText]);

  return (
    <>
      <TableContainer component={Paper} className="table">
        <div className="datatableTitle">
          <Link to={`/`} className="backLink">
            <ChevronLeftIcon />
          </Link>
          Orders
          <Link to={`/orders/new`} className="link">
            New Order
          </Link>
        </div>
        <Search
          data={orderData}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <div className="clearboth"></div>
        {orderData.length === 0 && <span>No records found to display!</span>}
        {orderData.length === 0 ? (
          <span>No Order provided yet</span>
        ) : (
          <Grid container className={classes.container} direction="row">
            <Table aria-label="simple table">
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
                    <TableCell className="tableCell">
                      <DeleteIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveOrder(row._id)}
                      />
                    </TableCell>
                    {/* <TableCell className="tableCell">
                    <span className={`status ${row.status}`}>{row.status}</span>
                  </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        )}
      </TableContainer>
    </>
  );
};

export default withStyles(styles)(List);
