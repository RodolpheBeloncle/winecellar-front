import React,{useEffect} from 'react';
import './featured.scss';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const Featured = ({ monthSales, targetPercentage }) => {
  useEffect(() =>[monthSales, targetPercentage])

  return (
    <div className="featured">
      <div className="top">
        {monthSales ? (
          <h1 className="title">Target Profit</h1>
        ) : (
          <h1 className="title">No orders provided yet</h1>
        )}
      </div>
      {monthSales && (
        <div className="bottom">
          <div className="featuredChart">
            <CircularProgressbar
              value={targetPercentage}
              text={`${targetPercentage}%`}
              strokeWidth={5}
            />
          </div>
          <p className="title">Total sales made this month</p>
          <p className="amount">{monthSales?.Total}€</p>
          {/* <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p> */}
          {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
        </div>
      )}
    </div>
  );
};

export default Featured;
