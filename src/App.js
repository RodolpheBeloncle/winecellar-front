import { useContext } from 'react';
import { WinesContext } from './wineContext/WinesContextProvider';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import { productColumns, userRows } from './datatablesource';
import NotFound from './pages/notFound/NotFound';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';
import Single from './pages/single/Single';
import SingleProduct from './pages/singleProduct/SingleProduct';
import NewProduct from './pages/newProduct/NewProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';
import { DarkModeContext } from './context/darkModeContext';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { wineData } = useContext(WinesContext);
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
                element={<NewProduct inputs={userInputs} title="Add NewCustomer" />}
              /> */}
            </Route>

            <Route path="products">
              <Route
                index
                element={
                  <List productColumns={productColumns} wineData={wineData} />
                }
              />
              <Route path=":productId" element={<SingleProduct wineData={wineData} />} />
              <Route
                path="new"
                element={
                  <NewProduct inputs={productInputs} title="Add NewProduct " />
                }
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
