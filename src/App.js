import {React, useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom'
import './App.css';
import Pages from './routes';
import { useCookies } from 'react-cookie';
import {Button, Navbar, Nav} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { tokenToJson } from './Utils/Common';

const axios = require('axios');


const [Cart, Checkout, Products, Login, SingleProduct] = Pages


function App() {
  const [isLogged, setisLogged] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user-session']);
  const [userid, setUserid] = useState('');


  const getCookieToken = () => {
    return cookies["user-session"] || null;
  }

  //
  const access_token=getCookieToken()
  
  const getUserId = () =>{
    setUserid(tokenToJson(access_token).sub)
  }

  if(userid.length === 0){
    getUserId();
  }

  sessionStorage.setItem("accessToken", access_token);
  sessionStorage.setItem("user-session", userid);
  //



   

  function PrivateRoute({ children }) {
    const auth = getCookieToken();
    return auth ? children : <Navigate to="/" />;
  }
  
  function PublicRoute({ children }) {
    const auth = getCookieToken();
    return !auth ? children : <Navigate to="/products" />;
  }
  
  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);

  function checkStorage() {
    if (getCookieToken()) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }

  const logout = () => {
    removeCookie("user-session");
    setisLogged(false);
  };

  

  return (
    <BrowserRouter>
    <Navbar bg="light" variant="light">
    <Nav className="me-auto">
        {!isLogged ? (
          <Nav.Link>
            <NavLink to="/"> </NavLink> 
          </Nav.Link>
        ) : (
        <Button onClick={logout} >Logout</Button>
        )}

        {isLogged ? (
          <Nav.Link>
            <NavLink to="/products" className={({ isActive }) => "is-active" + (isActive ? " activated" : "not-active")}>Products</NavLink>
          </Nav.Link>
          ) : (
            <NavLink to="/"> </NavLink> 
          )
        }
        {isLogged ? (
          <Nav.Link>
            <NavLink  to="/checkout"  className={({ isActive }) => "is-active" + (isActive ? " activated" : "not-active")}>Checkout</NavLink >  
          </Nav.Link>
          ) : (
            <NavLink to="/"> </NavLink> 
          )
        }
        {isLogged ? (
          <Nav.Link>
            <NavLink  to="/cart"  className={({ isActive }) => "is-active" + (isActive ? " activated" : "not-active")}>Cart</NavLink >  
          </Nav.Link>
          ) : (
            <NavLink to="/"> </NavLink> 
          )
        }

        </Nav>
      </Navbar>

      <Routes>
        <Route
          path="/"
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