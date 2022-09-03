import React from 'react';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ProductInfo from '../singleInfo/ProductInfo';
import InfoCustomer from '../singleInfo/InfoCustomer';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';


const Datatable = ({
  headersColumns,
  nestedData,
  title,
  handleRemove,
  refreshData,
  isLoading,
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
    nestedData
      .filter((element) => element._id === selectedData)
      .map((info) => console.log(info));
    refreshData();
  }, [selectedData, title, isLoading]);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',

      renderCell: (params) => {
        return (
          <div className="cellAction">
            {isLoading ? (
              <Box>
                <CircularProgress />
              </Box>
            ) : (
              <div
                className="deleteButton"
                onClick={() => handleRemove(params.row._id)}
              >
                <DeleteIcon />
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}s
        <Link to={`/${title}s/new`} className="link">
          New {title}
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
      {selectedData && (
        <div className="">
          <Box sx={{ height: '100vh', minWidth: 300, margin: 'auto auto' }}>
            <DataGrid
              className="datatable"
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
          </Box>
        </div>
      )}
    </div>
  );
};

export default Datatable;
