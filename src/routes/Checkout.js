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
  const [useremail, setUseremail] = useState();

  //Cart saker
  const [cartProductId, setProductId]=useState([]);
 
  const [cartProductAmount, setCartProductAmount]=useState([]);

  //Produkt saker
  const [productPrice, setPrice] = useState([]);
  const [cartProductName, setCartProductName]=useState([]);

  const [totalPrice, setTotal] = useState();

  const [proData, setproData]=useState([]);
  
/*
  axios.get("https://quiet-meadow-01451.herokuapp.com/orders",{
  headers: {
  'Authorization': `Bearer ${access_token}` 
  }}).then((res)=>{console.log(res.data)})
*/
  //Få användar info
  //https://flaviocopes.com/axios-send-authorization-header/
  const callUser=()=>{
    
      axios.get('https://cna22-user-service.herokuapp.com/users/data', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
      }).then((res) => {
       
        setUserid(tokenToJson(access_token).sub)
        setUseremail(tokenToJson(access_token).email)
       //if(inputAd1.length===0){ findAdress(useremail,res.data)}
       findAdress(useremail,res.data)

      })
      .catch((error) => {
      console.error(error)
      })
    
  }


  
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
console.log(userid)
callUser()


  /*  axios.get("https://quiet-meadow-01451.herokuapp.com/orders",{
      headers: {
        'Authorization': `Bearer ${access_token}`
      }})
      .then((res) => {
        console.log(res.data)
      })*/


const proId=[]
const amountD=[]
const pri=[]
const na=[]

  const cartInfoo=()=>{

   if(cartProductAmount.length===0){
    axios.get(`https://cna-cart-api.herokuapp.com/cart/${userid}`,{//använd 2 om din id ej hittas i cart att se att koden funkar${userid}
      headers: {
        'Authorization': `Bearer ${access_token}` 
      }
      })
      .then((result) => { 
        //cartInforma(result.data)
        const data=result.data
        for(let i=0; i<data.length;i++){
          proId.push(data[i].pId)
          //console.log(proId)
          amountD.push(data[i].productAmount)
          
        }
        console.log(proId)
        //setProductId(proId)
    
      //  if (cartProductName.length===0){getPrice(proId,amountD)}
      getPrice(proId,amountD)
        setProductId(proId)
        setCartProductAmount(amountD)
      })
      .catch((error) => {
        console.error(error)
      })
   }
  } 

  //if(cartProductAmount.length==0){cartInfoo()}
  cartInfoo()

/*  const cartInforma=(data)=>{
  
    for(let i=0; i<data.length;i++){
      proId.push(data[i].pId)
      //console.log(proId)
      amountD.push(data[i].productAmount)
      
    }
    console.log(proId)
    //setProductId(proId)

    getPrice(proId,amountD)
    setProductId(proId)
    setCartProductAmount(amountD)
  //setCartProductName( getPrice(proId,amountD))
}
*/
  //Få länk till producter
  const getPrice= (proId,proAm)=>{
    if (cartProductName.length===0){
      axios.get(`https://cna22-products-service.herokuapp.com/products`,{//${proId[j]},{// Ändra till cookies.item_id om något ej funkar att se att man faktist får info t.e.x när cart ej har saken i sig
      headers: {
        'Authorization': `Bearer ${access_token}` 
      }
      }).then((res)=>{
        getNamesAndPrices(res.data.items,proId,proAm)
        
        
      })
    }
  }
 // setCartProductName(cartProductName=>[ cartProductName, na])


 const getNamesAndPrices=(data,produId,amount)=>{
  
    let total=0
    for(var i=0; i<data.length;i++){
      if(data[i].pid===produId[i]){
        na.push(data[i].name)
        pri.push(Number(data[i].price*amount[i]))
        total=Number(total)+(Number(data[i].price)*Number(amount[i]))
      }
    }
    console.log(pri)
    setCartProductName(na)
    console.log(cartProductName.length)
    setPrice(pri)
    setTotal(total)
  
 }


 
  //Hanterar submit
  const onSubmit=(event)=>{
    event.preventDefault();

    for(var j=0;j<cartProductId.length; j++)
      axios.post("https://quiet-meadow-01451.herokuapp.com/orders",{
        
                    customerNumber: userid,
                    email:inputEmail,
                    itemId: cartProductId[j],
                    address: inputAd1,
                    price: productPrice[j]
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
          <div>
              <div id={'purchaseDiv'}>
                <p>Delivery information</p>
                <p>If this is the first time being on this site, please reload to get the cookie information</p>
                <b>Product(s):</b> {cartProductName+'\n'}
                <br></br>
                <form name={'confirmationForm'} onSubmit={onSubmit}>
                    <h3>Email</h3>   
                    <input value={inputEmail} readOnly  />
                    <h3>Address</h3>
                    <textarea  rows={'7'} cols={'20'}  value={inputAd1} readOnly />
               
                    <br></br>
                    <input className='confirmationButton' type={'submit'} value={'Submit'}></input>
                 </form>
                <p>Price: {totalPrice} EUR</p>
                <br></br>
             
              </div>
          

              <div id={'confirmationDiv'} >
                <p><b>We has sent the invoice to:</b> {inputEmail} </p>
                <p><b>Delivering to:</b>  {inputAd1}</p>
                <p><b>Products:</b>  {cartProductName+"\n"} </p>
                <p><b>Price:</b>  {totalPrice}</p>
              </div>  
          </div>
      </div> 
  );
 

}

export default Checkout