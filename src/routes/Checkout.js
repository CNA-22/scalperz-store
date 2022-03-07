import { render } from '@testing-library/react';
import { useRef } from 'react';
import React from "react"
import './styles/Checkout.css'
import { useState } from 'react';
import { useCookies } from "react-cookie";


const axios = require('axios');

const Checkout = () => {

  //Får JWT
  const getCookieToken = () => {
    return cookies["user-session"] || null;
  }
  const [cookies, setCookie] = useCookies(["user"]);
  const access_token=getCookieToken()

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

//TODO: Få flera saker. 
  const cartInfoo=()=>{
    axios.get(`https://cna-cart-api.herokuapp.com/cart/${userid}`,{//använd 2 om din id ej hittas i cart att se att koden funkar${userid}
      headers: {
        'Authorization': `Bearer ${access_token}` 
      }
      })
      .then((result) => { 

        setProductId(result.data[0].pId)
        console.log(result.data[0].pId)
        setCartProductName(result.data[0].productName)
        setCartProductAmount(result.data[0].productAmount)
        console.log(result.data[0].productAmount)

      })
      .catch((error) => {
      console.error(error)
      })
    }
    
  cartInfoo()


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


//Cookie för om man behöver testa något eller sakerna vid test skedje ej finns
 const handleCookie=()=> {
    setCookie("item_id", "394739127971", {
      path: "/"
    });
    setCookie("productAmount", "3", {
      path: "/"
    });
  }

  //Räkna ut priset
  const getPrice=()=>{
    axios.get(`https://cna22-products-service.herokuapp.com/product/${cartProductId}`)// Ändra till cookies.item_id om något ej funkar att se att man faktist får info t.e.x när cart ej har saken i sig
      .then((res)=>{
        setPrice(res.data.price*cartProductAmount)//
      })
    }
    getPrice()
    
    console.log(cartProductId)

  //Hanterar submit
  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post("https://quiet-meadow-01451.herokuapp.com/orders",{
      
                  customerNumber: userid,
                  email:inputEmail,
                  itemId: cartProductId,
                  address: inputAd1,
                  price: productPrice
    },{headers: {
      'Authorization': `Bearer ${access_token}` 
    }})
   
    //Confirmation info
    const confirmForm = document.getElementById('confirmationDiv');
    const inputForm = document.getElementById('purchaseDiv')

      if (confirmForm.style.display === 'none') {
          confirmForm.style.display = 'block';
         inputForm.style.display = 'none'
    
      } else {
          confirmForm.style.display = 'none';
         inputForm.style.display = 'block';
      }
  }
 

  return (
      <div >
          <div onLoad={handleCookie()}>

              <div id={'purchaseDiv'}>
     
                <p>Delivery information</p>
                <p>If this is the first time being on this site, please reload to get the cookie information</p>
                <p>Product: {cartProductName}</p>
                <form name={'confirmationForm'} onSubmit={handleSubmit}>
                    <h3>Email</h3>   
                    <input value={inputEmail} readOnly  />
                    <h3>Address</h3>
                    <textarea  rows={'7'} cols={'20'}  value={inputAd1} readOnly />
               
                    <br></br>
                    <input className='confirmationButton' type={'submit'} value={'Submit'}></input>
                 </form>
                <p>Price: {productPrice}</p>
                <br></br>
             
              </div>
          

              <div id={'confirmationDiv'} >
                <p>The purchase was sugsessful!</p>
                <p>We has sent the invoice to: {inputEmail} </p>
                <p>Delivered to: {inputAd1}</p>
                <p>Products: {cartProductName} </p>
                <p>Price: {productPrice}</p>
              </div>  
          </div>
      </div> 
  );
}


export default Checkout