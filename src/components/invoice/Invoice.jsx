import React, { useState, useEffect, useContext } from 'react';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import {publicRequest} from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllFromCart } from '../../redux/cartRedux';
import { saveAs } from 'file-saver';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { Container } from '@material-ui/core';

const Invoice = (props) => {
  const [isOrderSent, setOrderSent] = useState(false);
  const orderCart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user.userId);
  const { wineData, isLoading, setIsLoading } = useContext(WinesContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let optionsDate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const stockToUpdate = () => {
    return wineData.map(({ _id, quantity }) => ({ _id, quantity }));
  };

  const generateInvoiceId = () => {
    var d = new Date();
    var t = new Date().getTime();
    var generateId = Math.floor(Math.random() * (1000 - 500000)) + 1000;
    generateId =
      d.getFullYear() + (d.getMonth() + 1) + d.getDate() + generateId;
    generateId = generateId + t;
    return generateId.toString();
  };

  const invoiceDate = new Date().toLocaleDateString('fr-FR', optionsDate);
  const invoiceId = generateInvoiceId();

  const [inputs, setInputs] = useState({
    name: '',
    receiptId: invoiceId,
    orderCart: orderCart,
  });

  const handleChange = ({ target: { value, name } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const createAndDownloadPdf = () => {
    setIsLoading(true);
    let productToUpdate = stockToUpdate();
    let { name } = inputs;
    let products = orderCart.map(({ _id, quantity, price, title }) => ({
      productId: _id,
      title: title,
      price: price,
      quantity: quantity,
    }));

    publicRequest
      .post('/create-pdf', inputs)
      .then(() => publicRequest.get('/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        // set the id in newly created invoce
        saveAs(pdfBlob, `newInvoice ID:${invoiceId}.pdf`);
      })
      .then(() =>
      publicRequest.post('/orders', {
          userId: userId,
          customer: name,
          products: products,
          amount: totalAmount(orderCart),
        })
      )
      .then(() => {
        publicRequest.post('/products/many', { updates: productToUpdate });
      })
      .then(() => {
        setIsLoading(false);
        Swal.fire({
          title: `Invoice N° ${invoiceId} is registered!`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error}`,
          // footer: '<a href="">Why do I have this issue?</a>',
        });
        setOrderSent(false);
        return Promise.reject(error);
      });

    setOrderSent(true);
  };

  useEffect(() => {
    isOrderSent && dispatch(removeAllFromCart());
    isOrderSent && navigate('/orders');

    console.log('stockToUpdate', stockToUpdate());
  }, [orderCart, isOrderSent]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const totalAmount = (cart) => {
    return cart
      .map((item) => item.quantity * item.price)
      .reduce((acc, value) => acc + value)
      .toFixed(2);
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ textAlign: 'center' }}>Invoice ID:{invoiceId}</h2>
      <h3 style={{ textAlign: 'center' }}> Date: {invoiceDate}</h3>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>{Object.keys(orderCart[0])[1]}</TableCell>

                <TableCell align="left">
                  {Object.keys(orderCart[0])[4]}
                </TableCell>
                <TableCell>{Object.keys(orderCart[0])[2]}</TableCell>

                <TableCell align="right">
                  {Object.keys(orderCart[0])[0]}
                </TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orderCart
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((item) => item.quantity > 0)
                .sort((a, b) => (a.title > b.title ? 1 : -1))
                .map((item) => {
                  return (
                    <TableRow key={item.title}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell align="left">{item.quantity} </TableCell>
                      <TableCell>{item.content}</TableCell>
                      <TableCell align="right">
                        {/* {' '}
                        {(item.price * 0.84).toFixed(2)} € */}
                        {item.price} €
                      </TableCell>
                      <TableCell align="right">
                        {/* {(item.subtotal * 0.84).toFixed(2)} € */}
                        {item.quantity * item.price} €
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <strong>Total Amount</strong>
                </TableCell>
                <TableCell align="right">
                  {/* {invoiceItems
                    .map((item) => item.subtotal * 0.84)
                    .reduce((acc, value) => acc + value)
                    .toFixed(2)}{' '} */}
                  {totalAmount(orderCart)}€
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={orderCart.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <input
        type="text"
        placeholder="Customer Name"
        name="name"
        onChange={handleChange}
      />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ m: 1, position: 'relative' }}>
          <Fab
            style={{
              borderRadius: '50px',
              backgroundColor: ' #7451f8',
              color: 'white',
            }}
            aria-label="save"
            onClick={createAndDownloadPdf}
          >
            {isLoading ? <CheckIcon /> : <SaveIcon />}
          </Fab>
          {isLoading && (
            <CircularProgress
              size={68}
              sx={{
                color: blue[500],
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            style={{
              background: '#7451f8',
              borderRadius: 3,
              border: 0,
              color: 'white',
              height: 40,
              padding: '0 30px',
              boxShadow: '#7451f8',
            }}
            variant="contained"
            disabled={isLoading}
            onClick={createAndDownloadPdf}
          >
            Download Invoice
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Invoice;
