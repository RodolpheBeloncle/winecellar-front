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
    width: 210,
    maxwidth: 210,
    minWidth: 50,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.img
                ? `http://localhost:8000/${params.row.img}`
                : `https://cdn-icons-png.flaticon.com/512/149/149071.png`
            }
            alt="avatar"
          />
          {params.row.customer}
        </div>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 210,
    minWidth: 50,
  },

  {
    field: 'phone',
    headerName: 'Phone',
    width: 100,
    maxwidth: 100,
    minWidth: 50,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    maxwidth: 100,
    minWidth: 50,
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
    field: 'title',
    headerName: 'Title',
    width: 230,
    minWidth: 50,
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
    minWidth: 50,
  },
  {
    field: 'vintage',
    headerName: 'Vintage',
    width: 100,
    minWidth: 50,
  },
  {
    field: 'content',
    headerName: 'Content',
    width: 100,
    minWidth: 50,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
    minWidth: 50,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 160,
    minWidth: 50,
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
    customer: 'Snow',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    status: 'active',
    email: '1snow@gmail.com',
    phone: '06-90-14-16-89',
  },
  {
    _id: 2,
    customer: 'Jamie Lannister',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '2snow@gmail.com',
    status: 'passive',
    phone: '06-90-14-16-89',
  },
  {
    _id: 3,
    customer: 'Lannister',
    img: '',
    email: '3snow@gmail.com',
    status: 'pending',
    phone: '06-90-14-16-89',
  },
  {
    _id: 4,
    customer: 'Stark',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '4snow@gmail.com',
    status: 'active',
    phone: '06-90-14-16-89',
  },
  {
    _id: 5,
    customer: 'Targaryen',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '5snow@gmail.com',
    status: 'passive',
    phone: '06-90-14-16-89',
  },
  {
    _id: 6,
    customer: 'Melisandre',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '6snow@gmail.com',
    status: 'active',
    phone: '06-90-14-16-89',
  },
  {
    _id: 7,
    customer: 'Clifford',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '7snow@gmail.com',
    status: 'passive',
    phone: '06-90-14-16-89',
  },
  {
    _id: 8,
    customer: 'Frances',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '8snow@gmail.com',
    status: 'active',
    phone: '06-90-14-16-89',
  },
  {
    _id: 9,
    customer: 'Roxie',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'snow@gmail.com',
    status: 'pending',
    phone: '06-90-14-16-89',
  },
  {
    _id: 10,
    customer: 'Roxie',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'snow@gmail.com',
    status: 'active',
    phone: '06-90-14-16-89',
  },
];
