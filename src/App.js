import React, {Component, useState, useEffect} from 'react';
import { BrowserRouter, Link, Routes, Route, Switch, useNavigate, Navigate, NavLink, } from 'react-router-dom'
import './App.css';
import Pages from './routes';
import { Button} from 'react-bootstrap';
import { getToken, removeUserSession } from "./Utils/Common";


const [Cart, Checkout, Products, Login, Dashboard ] = Pages

function PrivateRoute({ children }) {
  const auth = getToken();
  return auth ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const auth = getToken();
  return !auth ? children : <Navigate to="/dashboard" />;
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
          <NavLink to="/login" className={({ isActive }) => "is-active" + (isActive ? " activated" : "not-active")} > Login</NavLink> 
        ) : (
          <Button onClick={logout} color="inherit">Logout</Button>
        )}

        <NavLink to="/products" className={({ isActive }) => "is-active" + (isActive ? " activated" : "not-active")}> Products</NavLink> 
        <NavLink to="/dashboard" className={({ isActive }) => "is-active" + (isActive ? " activated" : "not-active")}>Dashboard</NavLink >
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
        <Route path="products" element={<Products />}/>
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
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

