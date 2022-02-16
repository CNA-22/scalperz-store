import { render } from '@testing-library/react';
import { useRef } from 'react';
import React from "react"
import './styles/Checkout.css'
import { useState } from 'react';
import { useCookies } from "react-cookie";

const Checkout = () => {


  const [cookies, setCookie] = useCookies(["user"]);

  function handleCookie() {
    setCookie("item_id", "36D", {
      path: "/"
    });
    setCookie("productAmount", "1", {
      path: "/"
    });
    setCookie("user_id", "15", {
      path: "/"
    });
  }


  const [inputEmail, setInputEmail] = useState('');
  const [inputAd1, setInputAd1] = useState('');

  
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


  function handleSubmit(event) {
    event.preventDefault();

    let formData = purchaseForm.current;
  
    let data = JSON.stringify([{"userId": cookies.user_id,"itemId": cookies.item_id, 
      "Address": formData['address1'].value}]);

    data = JSON.parse(data);
    data.forEach(function(element){
        console.log(element);
    });

    alert("Object greated in Console")
  }

 
  return (
      <div >
          <div onLoad={handleCookie()}>

              <div id={'purchaseDiv'}>
     
                <p>Delivery information</p>
                <p>If this is the first time being on this site, please reload to get the cookie information</p>

                <form ref={purchaseForm}>
                    <h3>Payers Email</h3>
                    <input type={'email'} name={'email'} onInput={e => setInputEmail(e.target.value)} ></input>

                    <h3>Delivery Address</h3>
                    <textarea type={'text'} rows={'7'} cols={'20'} name={'address1'} onInput={e =>  setInputAd1(e.target.value)}></textarea>
                </form>

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

                 <button className='goBackButton' onClick={continu}>Go back</button>

              </div>  
          </div>
      </div> 
  );
}


export default Checkout