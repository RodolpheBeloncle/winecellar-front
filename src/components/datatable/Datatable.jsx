import './datatable.scss';
import { useEffect,useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { WinesContext } from '../../wineContext/WinesContextProvider';
import { Link } from 'react-router-dom';


const Datatable = ({ headersColumns, nestedData, title }) => {
  const { wineData } = useContext(WinesContext);
  const handleDelete = (id) => {
    nestedData.filter((item) => item._id !== id);
  };

  useEffect(() => {
    console.log('customlistdata', nestedData);
    console.log("winedata",wineData)
  }, [wineData]);

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
