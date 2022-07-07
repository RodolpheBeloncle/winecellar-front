
import React from 'react';
import wine_bottle from './img/wine-bottle.png';
import validStock from './img/valid.png';
import cautionStock from './img/caution.png';
import warningStock from './img/warning.png';

export const stockStatus = {
  outOfStock: 'outOfStock',
  toOrder: 'order',
  valid: 'valid',
};

// customer headers

export const customerColumns = [
  { field: '_id', headerName: 'ID', width: 70 },
  {
    field: 'customer',
    headerName: 'Customer',
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 230,
  },

  {
    field: 'age',
    headerName: 'Age',
    width: 100,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

// product headers

export const productColumns = [
  { field: '_id', headerName: 'ID', width: 70 },
  {
    field: 'product',
    headerName: 'Product',
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.img === '' ? (
            <>
              <img className="cellImg" src={wine_bottle} alt="winelabel" />
              {params.row.title}
            </>
          ) : (
            <>
              <img
                className="cellImg"
                src={`http://localhost:8000/${params.row.img}`}
                alt="label"
              />
              {params.row.title}
            </>
          )}
        </div>
      );
    },
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 100,
  },
  {
    field: 'vintage',
    headerName: 'Vintage',
    width: 100,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.quantity >= 3 ? (
            <>
              <img className="cellImg" src={validStock} alt="stateStock" />
              <div className={`cellWithStatus ${stockStatus.valid}`}>
                {params.row.quantity}
              </div>
            </>
          ) : params.row.quantity > 0 && params.row.quantity < 3 ? (
            <>
              <img className="cellImg" src={cautionStock} alt="stateStock" />
              <div className={`cellWithStatus ${stockStatus.toOrder}`}>
                {params.row.quantity}
              </div>
            </>
          ) : (
            <>
              <img className="cellImg" src={warningStock} alt="stateStock" />
              <div className={`cellWithStatus ${stockStatus.outOfStock}`}>
                {params.row.quantity}
              </div>
            </>
          )}
        </div>
      );
    },
  },
];

// order headers
// use table rows

//temporary data
export const customerData = [
  {
    _id: 1,
    username: 'Snow',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    status: 'active',
    email: '1snow@gmail.com',
    age: 35,
  },
  {
    _id: 2,
    username: 'Jamie Lannister',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '2snow@gmail.com',
    status: 'passive',
    age: 42,
  },
  {
    _id: 3,
    username: 'Lannister',
    img: '',
    email: '3snow@gmail.com',
    status: 'pending',
    age: 45,
  },
  {
    _id: 4,
    username: 'Stark',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '4snow@gmail.com',
    status: 'active',
    age: 16,
  },
  {
    _id: 5,
    username: 'Targaryen',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '5snow@gmail.com',
    status: 'passive',
    age: 22,
  },
  {
    _id: 6,
    username: 'Melisandre',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '6snow@gmail.com',
    status: 'active',
    age: 15,
  },
  {
    _id: 7,
    username: 'Clifford',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '7snow@gmail.com',
    status: 'passive',
    age: 44,
  },
  {
    _id: 8,
    username: 'Frances',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '8snow@gmail.com',
    status: 'active',
    age: 36,
  },
  {
    _id: 9,
    username: 'Roxie',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'snow@gmail.com',
    status: 'pending',
    age: 65,
  },
  {
    _id: 10,
    username: 'Roxie',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'snow@gmail.com',
    status: 'active',
    age: 65,
  },
];
