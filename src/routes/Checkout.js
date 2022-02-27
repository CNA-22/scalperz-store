import { render } from '@testing-library/react';
import { useRef } from 'react';
import React from "react"
import './styles/Checkout.css'
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { getToken } from "../Utils/Common";
const axios = require('axios');

const Checkout = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputAd1, setInputAd1] = useState('');
  const [userid, setUserid] = useState('');
  const [useremail, setUseremail] = useState('');
  const [cartProductId, setProductId]=useState('');
  const [cartProductName, setCartProductName]=useState();
  const [cartProductAmount, setCartProductAmount]=useState();
 
  const [productPrice, setPrice] = useState('');
  //const [inputAd231, setInputAd231] = useState('');


  const [cookies, setCookie] = useCookies(["user"]);


  const access_token=getToken()

  
  
  //https://flaviocopes.com/axios-send-authorization-header/
  const callUser=()=>{
      axios.get('https://cna22-user-service.herokuapp.com/users/data', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
      })
      .then((res) => {
        //console.log(res.data)
        // setUserData(res.data)
        setUserid(tokenToJson(access_token).sub)
        setUseremail(tokenToJson(access_token).email)
        findAdress(useremail,res.data)

      })
      .catch((error) => {
      console.error(error)
      })
 
  }
  callUser()

 // console.log(userData)
  console.log(useremail)

const cartInfoo=()=>{
  axios.get(`https://cna-cart-api.herokuapp.com/cart/2`,{//ändra 2 till: ${userid}
    headers: {
      'Authorization': `Bearer ${access_token}` 
    }
    })
    .then((result) => { 
      //console.log(result.data.length)
     // console.log(result.data[1].pId);     
     //setProductId(result.data[0].pId);
     setProductId(result.data[0].pId)
     setCartProductName(result.data[0].productName)
     setCartProductAmount(result.data[0].productAmount)
     console.log(result.data[0].productAmount)
    
    
    
    })
    .catch((error) => {
    console.error(error)
    })
  }
  cartInfoo()
 /*  const getAllId=(info)=>{
        for(var j=0;j<info.length;j++){
          cartProductId.push(info[j].pId);
        }
   }*/


//cartInfoo()
 //console.log(cartProductId)
 //setProductId(result.data.pId)

const tokenToJson= (token) =>{
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base64));
}
  
 ///TODO: Good to have:FÅ ÄNDRA PÅ ADRESSEN PÅ INPUT 
const findAdress=(mail,data)=>{
 
    for(var i=0;i<data.length;i++){
      if(mail===data[i].email){
        console.log(data[i].email)
        //address=data[i].adress+' '+data[i].zip
       // inputAd1=address
       setInputAd1(data[i].adress+' '+data[i].zip)
       // console.log(data[i].adress+' '+data[i].zip)
        //return address
      }
    }
}


console.log(useremail)
console.log(userid)
//console.log(inputAd231)


 const handleCookie=()=> {
    setCookie("item_id", "394739127971", {
      path: "/"
    });
    setCookie("productAmount", "3", {
      path: "/"
    });
  }

  const getPrice=()=>{
    axios.get(`https://cna22-products-service.herokuapp.com/product/${cookies.item_id}`)// Ändra till detta när cart har rikdiga idn: cartProductId
      .then((res)=>{
        setPrice(res.data.price*cartProductAmount)
      })
    }
    getPrice()
    
    console.log(cartProductAmount)
  
  const purchaseForm= useRef(null)

  //Div byte
  const continu=()=>{
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
  
 
  const handleSubmit=(event)=>{
    event.preventDefault();

    let formData = purchaseForm.current;
    
    let data = JSON.stringify([{"userId": userid,"itemId": cartProductId, 
      "Address": formData['address1'].value,"Price": productPrice}]);

    data = JSON.parse(data);

    axios.post("https://quiet-meadow-01451.herokuapp.com/orders",{
      
                  customerNumber: userid,
                  itemId: cookies.item_id,
                  address: inputAd1,
                  price: productPrice
    },{headers: {
      'Authorization': `Bearer ${access_token}` 
    }})
   

    data.forEach(function(element){
        console.log(element);
    });
   axios.get("https://quiet-meadow-01451.herokuapp.com/orders")
    .then((res)=>{
    console.log(res.data)})

    alert("Object greated in Console")
  }
 
  return (
      <div >
          <div onLoad={handleCookie()}>

              <div id={'purchaseDiv'}>
     
                <p>Delivery information</p>
                <p>If this is the first time being on this site, please reload to get the cookie information</p>
                <p>Product: ${cartProductName}</p>
                <form ref={purchaseForm}>
                    <h3>Payers Email</h3>
                    <input type={'email'} name={'email'}  onInput={e => setInputEmail(e.target.value)} ></input>

                    <h3>Delivery Address</h3>
                    <textarea type={'text'} rows={'7'} cols={'20'} name={'address1'} value={inputAd1}  onChange={e =>  setInputAd1(e.target.value)}></textarea>
                </form>
                <p>Price: ${productPrice}</p>
                <br></br>
                <button className='confirmationButton' onClick={continu}>Confirm purchase</button>
              </div>
          

              <div id={'confirmationDiv'} >
                <form name={'confirmationForm'} onSubmit={handleSubmit}>
                    <h3>Email</h3>   
                    <input value={inputEmail} readOnly  />
                    <h3>Address</h3>
                    <textarea  rows={'7'} cols={'20'} value={inputAd1} readOnly />
               
                    <br></br>
                    <input className='confirmationButton' type={'submit'} value={'Submit'}></input>
                 </form>
                 <p>Price: ${productPrice}</p>
                 <button className='goBackButton' onClick={continu}>Go back</button>

              </div>  
          </div>
      </div> 
  );
}


export default Checkout