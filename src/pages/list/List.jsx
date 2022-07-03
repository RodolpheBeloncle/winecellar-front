import './list.scss';
import Datatable from '../../components/datatable/Datatable';

const List = ({productColumns, userRows}) => {
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable productColumns={productColumns} userRows={userRows}  />
      </div>
    </div>
  );
};

export default List;
