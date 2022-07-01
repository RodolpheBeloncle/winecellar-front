import './notFound.scss';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="NotFound">
    <h1>Yikes!</h1>
    <h2>I'm thinking this isn't where you wanted to be.</h2>

    <div class="buttons">
      <Link to="/">
        <span>Go Home</span>
      </Link>
    </div>
  </div>
);

export default NotFound;
