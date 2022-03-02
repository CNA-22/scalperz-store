import {React, useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom'
import './App.css';
import Pages from './routes';
import { useCookies } from 'react-cookie';
import {Button, Navbar, Nav} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const axios = require('axios');


const [Cart, Checkout, Products, Login, SingleProduct] = Pages


function App() {
  const [isLogged, setisLogged] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user-session']);

  const getCookieToken = () => {
    console.log(cookies);
    return cookies["user-session"] || null;
  }

//Användare
const [inputEmail, setInputEmail] = useState('');
const [inputAd1, setInputAd1] = useState('');
const [userid, setUserid] = useState('');
const [useremail, setUseremail] = useState('');

//Cart saker
const [cartProductId, setProductId]=useState('');
const [cartProductName, setCartProductName]=useState();
const [cartProductAmount, setCartProductAmount]=useState();

//Produkt saker
const [productPrice, setPrice] = useState('');

  const access_token = getCookieToken();



      //kopierat från checkout
    //Få användar info
  //https://flaviocopes.com/axios-send-authorization-header/
  const callUser=()=>{
    axios.get('https://cna22-user-service.herokuapp.com/users/data', {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
    })
    .then((res) => {
     
      setUserid(tokenToJson(access_token).sub)
      setUseremail(tokenToJson(access_token).email)
      findAdress(useremail,res.data)

    })
    .catch((error) => {
    console.error(error)
    })
}
callUser()




//Hantera token
const tokenToJson= (token) =>{
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base64));
}

//Hitta användar address
const findAdress=(mail,data)=>{
  for(var i=0;i<data.length;i++){
    if(mail===data[i].email){
      console.log(data[i].email)
      setInputEmail(data[i].email)
    setInputAd1(data[i].adress+' '+data[i].zip)
    }
  }
}

sessionStorage.setItem("accessToken", access_token);
sessionStorage.setItem("user", userid);


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