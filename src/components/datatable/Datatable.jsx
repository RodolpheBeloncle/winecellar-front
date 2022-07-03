import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Datatable = ({ productColumns, wineData }) => {
  const handleDelete = (id) => {
    wineData.filter((item) => item._id !== id);
  };

  useEffect(() => {}, []);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: 'none' }}>
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
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        getRowId={(r) => r._id}
        rows={wineData}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
