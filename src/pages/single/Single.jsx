import './single.scss';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import wine_bottle from '../../img/wine-bottle.png';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import { customerData } from '../../datatablesource';
import { WinesContext } from '../../wineContext/WinesContextProvider';

const Single = ({ dataType }) => {
  let selectedId = useParams();

  const [selectedItem, setSelectedItem] = useState([]);
  const { wineData } = useContext(WinesContext);

  let data;

  switch (dataType) {
    case 'product':
      data = {
        selected: wineData
          .filter((element) => {
            return element._id === selectedId.productId;
          })
          .map((item) => item),
      };
      break;
    case 'customer':
      data = {
        selected: customerData
          .filter((element) => {
            return element._id === parseInt(Object.values(selectedId));
          })
          .map((item) => item),
      };
      break;

    default:
      break;
  }

  useEffect(() => {
    console.log('element Selected', data.selected);
    setSelectedItem(data.selected);
  }, []);

  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            {Object.values(data.selected).map((element) => (
              <>
                <div className="editButton">Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src={`http://localhost:8000/${element.img}`}
                    alt="productImg"
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{element.title}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">janedoe@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">+1 2345 67 89</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">
                        Elton St. 234 Garden Yd. NewYork
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Country:</span>
                      <span className="itemValue">USA</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
