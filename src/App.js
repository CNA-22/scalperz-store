import React, {Component} from 'react';
import { BrowserRouter, Link, Routes, Route, Switch} from 'react-router-dom'
import './App.css';
import Pages from './routes';

const [Cart, Checkout, Products, Login, Logout, Admin] = Pages

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
      </nav>
      <Routes>
        <Route path="products" element={<Products />}/>
        <Route path="cart" element={<Cart />}/>
        <Route path="login" element={<Login />}/>
        <Route path="logout" element={<Logout />}/>
        <Route path="admin" element={<Admin />}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
