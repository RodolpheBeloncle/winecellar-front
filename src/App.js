import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import { productColumns, userRows } from "./datatablesource";
import NotFound from './pages/notFound/NotFound';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';
import Single from './pages/single/Single';
import NewProduct from './pages/new/NewProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<Home />} />

            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              {/* <Route
                path="new"
                element={<NewProduct inputs={userInputs} title="Add NewProduct Customer" />}
              /> */}
            </Route>

            <Route path="products">
              <Route index element={<List productColumns={productColumns} userRows={userRows} />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<NewProduct inputs={productInputs} title="Add NewProduct Product" />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
