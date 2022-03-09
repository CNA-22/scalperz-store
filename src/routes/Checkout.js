import { render } from '@testing-library/react';
import { useRef } from 'react';
import React from "react"
import './styles/Checkout.css'
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { Next } from 'react-bootstrap/esm/PageItem';


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
  const [cartProductId, setProductId]=useState([]);
  const [cartProductName, setCartProductName]=useState([]);
  const [cartProductAmount, setCartProductAmount]=useState([]);

  //Produkt saker
  const [productPrice, setPrice] = useState();
 

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
console.log(userid)
//TODO: Få flera saker.

  const cartInfoo=()=>{
    if(cartProductAmount.length<1){
    axios.get(`https://cna-cart-api.herokuapp.com/cart/${userid}`,{//använd 2 om din id ej hittas i cart att se att koden funkar${userid}
      headers: {
        'Authorization': `Bearer ${access_token}` 
      }
      })
      .then((result) => { 
        let proId=[]
        let prodA=[]

        for(var i=0;i<result.data.length;i++)
        {
          prodA.push(result.data[i].productAmount)
          proId.push(result.data[i].pId)
        }
        
        setCartProductAmount(prodA)
        setProductId(proId)
        
        //setProductId(result.data[0].pId)
       // console.log(result.data[0].pId)
       
        //setCartProductAmount(result.data[0].productAmount)
        //console.log(result.data[0].productAmount)

      })
      .catch((error) => {
      console.error(error)
      })
    }
  }


  if(cartProductAmount.length<1){cartInfoo()}

console.log(cartProductAmount)

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
          //console.log(data[i])
          setInputEmail(data[i].email)
        setInputAd1(data[i].adress+' '+data[i].zip)
        }
      }
  }


//Cookie för om man behöver testa något eller sakerna vid test skedje ej finns


  //Räkna ut priset
  const getPrice= ()=>{
    if(cartProductName.length<1){
      let newPris=0
      const newName=[]
      //const newPris = []
      let proAmo=cartProductAmount
     
      
      for(var j=0; j<cartProductId.length;j++){
      
        axios.get(`https://cna22-products-service.herokuapp.com/product/${cartProductId[j]}`,{
        headers: {
          'Authorization': `Bearer ${access_token}` 
        }
        })
        .then((res)=>{
          
           console.log([j])
           console.log(Object.values(proAmo))
            newPris=(newPris)+(res.data.price*((cartProductAmount[0]))) //Vill ej funka med [j] för mig iallafall
            console.log(typeof (cartProductAmount[0]));
            console.log(typeof newPris);
            console.log(typeof res.data.price);
            console.log(newPris)
            newName.push(res.data.name)
           setCartProductName(oldArray => [...oldArray, res.data.name]);
           setPrice(newPris)  
               //return newName   
        })
      
      }  

      //setCartProductName(newName);
      console.log(newPris)
      
    }
    
  }
  
  if(cartProductName.length<1){ getPrice()}
  console.log(cartProductName)
  console.log(productPrice)

  //Hanterar submit
  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post("https://quiet-meadow-01451.herokuapp.com/orders",{
      
                  customerNumber: userid,
                  email:inputEmail,
                  itemId: cartProductId[0],
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
          <div>

              <div id={'purchaseDiv'}>
     
                
                <p><b>Product(s):</b> {cartProductName}</p>
                <form name={'confirmationForm'} onSubmit={handleSubmit}>
                    <h3>Email</h3>   
                    <input value={inputEmail} readOnly  />
                    <h3>Address</h3>
                    <textarea  rows={'7'} cols={'20'}  value={inputAd1} readOnly />
               
                    <br></br>
                    <input className='confirmationButton' type={'submit'} value={'Submit'}></input>
                 </form>
                <p><b>Price:</b> {productPrice} EUR</p>
                <br></br>
             
              </div>
          

              <div id={'confirmationDiv'} >
                <p><b>We has sent the invoice to:</b> {inputEmail} </p>
                <p><b>Delivering to:</b> {inputAd1}</p>
                <p><b>Products:</b> {cartProductName} </p>
                <p><b>Price:</b> {productPrice} EUR</p>
              </div>  
          </div>
      </div> 
  );
}


export default Checkout