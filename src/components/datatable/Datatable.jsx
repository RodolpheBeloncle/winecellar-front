import React from 'react';
import './datatable.scss';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const Datatable = ({
  headersColumns,
  nestedData,
  title,
  handleDelete,
  refreshData,
}) => {
  useEffect(() => {
    refreshData();
    console.log('customlistdata', nestedData);
  }, []);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${title}s/${params.row._id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="viewButton">View</div>
            </Link>
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
      <DataGrid
        className="datagrid"
        getRowId={(r) => r._id}
        rows={nestedData}
        columns={headersColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
