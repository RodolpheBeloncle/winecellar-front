import React from 'react';
import { useContext } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import List from './pages/list/List';
import NotFound from './pages/notFound/NotFound';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';
import ProductInfo from './components/singleInfo/ProductInfo';
import InfoCustomer from './components/singleInfo/InfoCustomer';
import NewProduct from './pages/newProduct/NewProduct';
import NewOrder from './pages/newOrder/NewOrder';
import NewCustomer from './pages/newCustomer/NewCustomer';
import Profil from './pages/profil/Profil';
import OrderInvoice from './pages/orderInvoice/OrderInvoice';
import OrderTable from './components/orderTable/OrderTable';
import UpdateSelection from './pages/update/UpdateSelection';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { productInputs, customerInputs } from './formSource';
import { DarkModeContext } from './context/darkModeContext';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="customers">
              <Route index element={<List dataType={'customer'} />} />
              <Route
                path=":customerId"
                element={<InfoCustomer dataType={'customer'} />}
              />
              <Route
                path="new"
                element={
                  <NewCustomer
                    inputs={customerInputs}
                    title="Add NewCustomer"
                  />
                }
              />
              <Route
                path="update/:selectedId"
                element={
                  <UpdateSelection
                    dataType={'customer'}
                    title="Update Customer"
                  />
                }
              />
            </Route>

            <Route path="products">
              <Route index element={<List dataType={'product'} />} />
              <Route
                path=":productId"
                element={<ProductInfo dataType={'product'} />}
              />
              <Route
                path="new"
                element={
                  <NewProduct inputs={productInputs} title="Add NewProduct " />
                }
              />
              <Route
                path="update/:selectedId"
                element={
                  <UpdateSelection
                    dataType={'product'}
                    title="Update Product"
                  />
                }
              />
            </Route>

            <Route path="orders">
              <Route index element={<OrderTable />} />
              <Route path="new" element={<NewOrder title="New Order" />} />
            </Route>
            <Route path="new/order" element={<OrderInvoice />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
