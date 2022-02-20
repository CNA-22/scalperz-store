import React, {Component, useState, useEffect} from 'react';
import { BrowserRouter, Link, Routes, Route, Switch, useNavigate, Navigate, NavLink, } from 'react-router-dom'
import './App.css';
import Pages from './routes';
import { getToken, removeUserSession } from "./Utils/Common";
import {Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"

const [Cart, Checkout, Products, Login, SingleProduct] = Pages

function PrivateRoute({ children }) {
  const auth = getToken();
  return auth ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const auth = getToken();
  return !auth ? children : <Navigate to="/products" />;
}

function App() {
  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);

  function checkStorage() {
    if (getToken()) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }

  const logout = () => {
    removeUserSession();
    setisLogged(false);
  };

  return (
    <BrowserRouter>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        {!isLogged ? (
          <NavLink to="/login" > 
              <Button>Login</Button>
          </NavLink> 
        ) : (
          <Button onClick={logout} >Logout</Button>
        )}

        <NavLink to="/products" className={({ isActive }) => "is-active" + (isActive ? " activated" : "not-active")}> Products</NavLink> 
        <NavLink  to="/cart"  className={({ isActive }) => "is-active" + (isActive ? " activated" : "not-active")}> Cart</NavLink >      
        <NavLink  to="/checkout"  className={({ isActive }) => "is-active" + (isActive ? " activated" : "not-active")}>Checkout</NavLink >


      </nav>

      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="product/:id"
          element={
            <PrivateRoute>
              <SingleProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

