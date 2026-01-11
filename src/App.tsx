import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Product from './components/Product/Product';
import NotFound from './components/NotFound/NotFound';
import DeleteProduct from './components/DeleteProduct/DeleteProduct';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import { clearMessage } from './redux/slices/systemMessageSlice';
import './App.css';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/sign_up'];
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.systemMessage.message);
  const [showAlert, setShowAlert] = useState(false);
  const DeleteProduct = lazy(() => import('./components/DeleteProduct/DeleteProduct'));

  useEffect(() => {
    if (message) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <div className="App">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar></Navbar>}
      <Routes>
        <Route path='/' element={<LogIn></LogIn>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
        <Route path='sign_up' element={<SignUp></SignUp>}></Route>
        <Route path='home' element={<Home></Home>}></Route>
        <Route path='products' element={<Products></Products>}></Route>
        <Route path='product' element={<Product></Product>}></Route>
        <Route path='shopping_cart' element={<ShoppingCart></ShoppingCart>} ></Route>
        <Route path='personal_information' element={<PersonalInfo></PersonalInfo>}></Route>
        <Route path='add_product' element={<AddNewProduct></AddNewProduct>}></Route>
        <Route path='delete' element={<Suspense fallback={<div>טוען את המוצרים...</div>}><DeleteProduct></DeleteProduct></Suspense>}></Route>
      </Routes>
      


      {showAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
          style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, backgroundColor: '#f2ece7',color: '#9d5d32',border: '2px solid white',
          borderRadius: '4px',
          paddingRight: '2.5rem',}}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default App;
