import React, {Component} from 'react';
import { BrowserRouter, Link, Routes, Route, Switch, useNavigate, Navigate} from 'react-router-dom'
import './App.css';
import Pages from './routes';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken } from "./Utils/Common";


const [Cart, Checkout, Products, Login, Dashboard ] = Pages

const Private = (Component) => {
  return getToken() ? <Component /> : <Navigate to="/login" /> 
}

const Public = (Component) => {
  return !getToken() ? <Component /> : <Navigate to={{pathname: "/dashboard" }} /> 
}


function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        
        <Link to="/products"> Products</Link> 
        <Link to="/cart"> Cart</Link>
        <Link to="/login"> Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>

      <Routes>
        <Route path="products" element={<Products />}/>
        <Route path="cart" element={<Cart />}/>
        <Route path="login" element={<Login/>}/>
        <Route path="dashboard" element={<Private Component={Dashboard} />} />
        <Route path="checkout" element={<Checkout />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
