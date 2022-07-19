import React from 'react';
import './datatable.scss';
import { useEffect, useState } from 'react';
import ProductInfo from '../singleInfo/ProductInfo';
import InfoCustomer from '../singleInfo/InfoCustomer';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const Datatable = ({
  headersColumns,
  nestedData,
  title,
  handleDelete,
  refreshData,
}) => {
  const [selectedData, setSelectedData] = useState([]);

  let data;

  switch (title) {
    case 'product':
      data = {
        selected: nestedData
          .filter((element) => element._id === selectedData)
          .map((info) => <ProductInfo info={info} />),
      };
      break;
    case 'customer':
      data = {
        selected: nestedData
          .filter((element) => element._id === selectedData)
          .map((info) => <InfoCustomer info={info} />),
      };
      break;

    default:
      break;
  }

  useEffect(() => {
    console.log('data selection', data.selected);
    nestedData
      .filter((element) => element._id === selectedData)
      .map((info) => console.log(info));
    refreshData();
    // console.log('customlistdata', nestedData);
    // console.log('dataType', title);
  }, [selectedData, title]);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {title}
        <Link to={`/${title}s/new`} className="link">
          Add New
        </Link>
      </div>

      {/* <div className="top"> */}
      {/* <div className="left">
          {selectedData && (
            <Single selectedData={selectedData} dataType={title} />
          )}
        </div> */}
      {/* <div className="right">
          ==== shopping car increase or decrease amount current
            <Chart
              aspect={3 / 1}
              title={`sales ${dataType} ( Last 6 Months)`}
            />
          </div> */}
      {/* </div> */}
      <div className="single">
        <div className="singleContainer">
          <div className="top">
            <div className="left">{data.selected}</div>
            {/* <div className="right">
            <Chart
              aspect={3 / 1}
              title={`sales ${dataType} ( Last 6 Months)`}
            />
          </div> */}
          </div>
        </div>
      </div>
      <DataGrid
        className="datagrid"
        getRowId={(r) => r._id}
        rows={nestedData}
        columns={headersColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        onSelectionModelChange={(ids) => {
          nestedData
            .filter((element) => {
              return element._id === ids[0];
            })
            .map((item) => setSelectedData(item._id));
        }}
        selectionModel={selectedData}
      />
    </div>
  );
};

export default Datatable;
