import React from 'react';
import './table.scss';
import { formatDate } from '../../utils/formatDate';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const List = ({ latestOrders }) => {
  return (
    <>
      <TableContainer component={Paper} className="table">
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
              {latestOrders.map((row) => (
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
