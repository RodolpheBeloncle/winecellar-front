import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
// import { publicRequest } from '../../utils/api';
import { publicRequest } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { saveAs } from 'file-saver';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { Container } from '@material-ui/core';

const Invoice = () => {
  const dispatcher = useDispatch();
  const orderCart = useSelector((state) => state.cart);
  const [inputs, setInputs] = useState({
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0,
  });

  const generateInvoiceId = () => {
    var d = new Date();
    var t = new Date().getTime();
    var generateId = Math.floor(Math.random() * (1000 - 500000)) + 1000;
    generateId =
      d.getFullYear() + (d.getMonth() + 1) + d.getDate() + generateId;
    generateId = generateId + t;
    return generateId.toString();
  };

  const today = new Date();
  const invoiceDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;
  const invoiceId = generateInvoiceId();

  const handleChange = ({ target: { value, name } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const createAndDownloadPdf = () => {
    publicRequest
      .post('/create-pdf', inputs)
      .then(() => publicRequest.get('/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        // set the id in newly created invoce
        saveAs(pdfBlob, `newInvoice ID:${invoiceId}.pdf`);
      });
  };

  useEffect(() => {
    console.log(inputs);
    console.log('order', orderCart);
    console.log(generateInvoiceId());
  });

  const { name, receiptId, price1, price2 } = inputs;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Example data (invoice items)
  const invoiceItems = [
    {
      qty: 1,
      price: 84.99,
      subtotal: 84.99,
      currency: 'USD',
      name: 'Gaming Headset',
      content: 'magnum',
    },
    {
      qty: 2,
      price: 99.99,
      subtotal: 199.98,
      currency: 'USD',
      name: 'Gaming Controller',
      content: 'magnum',
    },
    {
      qty: 1,
      price: 19.99,
      subtotal: 19.99,
      currency: 'USD',
      name: 'USB PowerPort',
      content: 'magnum',
    },
    {
      qty: 5,
      price: 5.08,
      subtotal: 25.4,
      currency: 'USD',
      name: 'Smartphone Screen Protector',
      content: 'magnum',
    },
    {
      qty: 3,
      price: 17.99,
      subtotal: 53.97,
      currency: 'USD',
      name: 'V-Neck T-Shirt',
      content: 'demi-bouteille',
    },
    {
      qty: 1,
      price: 33.96,
      subtotal: 33.96,
      currency: 'USD',
      name: 'Night Vision Binoculars',
      content: 'jeroboam',
    },
    {
      qty: 0,
      price: 8.49,
      subtotal: 0,
      currency: 'USD',
      name: 'USB Car Charger',
      content: 'bouteille',
    },
    {
      qty: 1,
      price: 79.99,
      subtotal: 79.99,
      currency: 'USD',
      name: 'Car Dash Cam',
      content: 'bouteille',
    },
    { qty: 0, price: 11.44, subtotal: 0, currency: 'USD', name: 'Sunglasses',content: 'bouteille', },
    {
      qty: 1,
      price: 21.99,
      subtotal: 21.99,
      currency: 'USD',
      name: 'Leather Belt',
      content: 'bouteille',
    },
  ];

  const reducer = (acc, value) => acc + value;

  console.log('header name', Object.keys(invoiceItems[0]));
  console.log('lisa', invoiceItems.map((item) => item.name).sort());

  return (
    <Container maxWidth="md">
      <h2 style={{ textAlign: 'center' }}>Invoice ID:{invoiceId}</h2>
      <h3 style={{ textAlign: 'center' }}> Date: {invoiceDate}</h3>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>{Object.keys(invoiceItems[0])[4]}</TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[0]}
                </TableCell>
                <TableCell >
                  {Object.keys(invoiceItems[0])[5]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[1]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[2]}
                </TableCell>
              
             
              </TableRow>
            </TableHead>

            <TableBody>
              {invoiceItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((item) => item.subtotal > 0)
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item) => {
                  return (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.qty} </TableCell>
                      <TableCell >{item.content}</TableCell>
                      <TableCell align="right">
                        {' '}
                        {(item.price * 0.84).toFixed(2)} €
                      </TableCell>
                      <TableCell align="right">
                        {(item.subtotal * 0.84).toFixed(2)} €
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <strong>Total Amount in EUR</strong>
                </TableCell>
                <TableCell align="right">
                  {invoiceItems
                    .map((item) => item.subtotal * 0.84)
                    .reduce((acc, value) => acc + value)
                    .toFixed(2)}{' '}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={invoiceItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>

    // <div className="invoice-document">
    //   <div className="invoice-box">
    //     <table cellpadding="0" cellspacing="0">
    //       <tr className="top">
    //         <td colspan="2">
    //           <table>
    //             <tr>
    //               <td className="title">
    //                 <img
    //                   src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
    //                   style={{ width: '100%', maxWidth: '156px' }}
    //                   alt=""
    //                 />
    //               </td>
    //               <td>
    //                 Date : <br />
    //                 {`${today.getDate()}/ ${
    //                   today.getMonth() + 1
    //                 }/ ${today.getFullYear()}.`}
    //               </td>
    //             </tr>
    //           </table>
    //         </td>
    //       </tr>
    //       <tr className="information">
    //         <td colspan="2">
    //           <table>
    //             <tr>
    //               <td>Customer name: ${name}</td>
    //               <td>Receipt number: ${receiptId}</td>
    //             </tr>
    //           </table>
    //         </td>
    //       </tr>
    //       <tr className="heading">
    //         <td>Bought items:</td>
    //         <td>Price</td>
    //       </tr>
    //       <tr className="item">
    //         <td>First item:</td>
    //         <td>${price1}$</td>
    //       </tr>
    //       <tr className="item">
    //         <td>Second item:</td>
    //         <td>${price2}$</td>
    //       </tr>
    //     </table>
    //     <br />
    //     <h1 className="justify-center">
    //       Total price: ${parseInt(price1) + parseInt(price2)}$
    //     </h1>
    //   </div>

    //   <input
    //     type="text"
    //     placeholder="Name"
    //     name="name"
    //     onChange={handleChange}
    //   />
    //   <input
    //     type="Number"
    //     placeholder="Receipt ID"
    //     name="receiptId"
    //     onChange={handleChange}
    //   />
    //   <input
    //     type="number"
    //     placeholder="Price 1"
    //     name="price1"
    //     onChange={handleChange}
    //   />
    //   <input
    //     type="number"
    //     placeholder="Price 2"
    //     name="price2"
    //     onChange={handleChange}
    //   />
    //   <button onClick={createAndDownloadPdf}>Download PDF</button>
    // </div>
  );
};

export default Invoice;
