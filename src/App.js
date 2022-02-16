import React, {Component} from 'react';
import { BrowserRouter, Link, Routes, Route, Switch} from 'react-router-dom'
import './App.css';
import Pages from './routes';


const [Cart, Checkout, Products, Login, Dashboard ] = Pages

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
        <Link to="/checkout">Checkout</Link>
      </nav>
      <Routes>
        <Route path="products" element={<Products />}/>
        <Route path="cart" element={<Cart />}/>
        <Route path="login" element={<Login />}/>
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="checkout" element={<Checkout />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
