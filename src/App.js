import { useContext } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import NotFound from './pages/notFound/NotFound';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';
import Single from './pages/single/Single';
import NewProduct from './pages/newProduct/NewProduct';
import NewOrder from './pages/newOrder/NewOrder';
import NewCustomer from './pages/newCustomer/NewCustomer';
import Table from './components/table/Table';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';
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

            <Route path="customers">
              <Route index element={<List dataType={'customer'} />} />
              <Route
                path=":customerId"
                element={<Single dataType={'customer'} />}
              />
              {/* <Route
                path="new"
                element={<NewProduct inputs={userInputs} title="Add NewCustomer" />}
              /> */}
            </Route>

            <Route path="products">
              <Route index element={<List dataType={'product'} />} />
              <Route
                path=":productId"
                element={<Single dataType={'product'} />}
              />
              <Route
                path="new"
                element={
                  <NewProduct inputs={productInputs} title="Add NewProduct " />
                }
              />
            </Route>

            <Route path="orders">
              <Route index element={<Table />} />
              <Route path=":orderId" element={<Single dataType={'order'} />} />
              <Route
                path="new"
                element={<NewOrder inputs={userInputs} title="New Order" />}
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
