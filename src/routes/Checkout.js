import { render } from '@testing-library/react';
import { useRef } from 'react';
import React from "react"
import './styles/Checkout.css'
import { useState } from 'react';

const Checkout = () => {

  const [inputFirstN, setInputFirstN] = useState('');
  const [inputLastN, setInputLastN] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputAd1, setInputAd1] = useState('');
  const [inputAd2, setInputAd2] = useState('');
  
  
  const purchaseForm= useRef(null)
  
  
  //värg om produkten skall gå till den som betalar eller till någon annan
  //https://www.pluralsight.com/guides/how-to-get-selected-value-from-a-mapped-select-input-in-react
  //TODO: Funktionaliteten till den här
  const selectDeliveryOptions=[
      {
          label: "Deliver to my address",
          value: "same_address"
      },
      {
          label: "Deliver to another address",
          value: "different_address"
      }
  ];

 
  //Alert som poppar upp när man klickar på knappen. Efteråt som en 
  const alertClickEvent = () => {

      //Får information från formen
      const formInfo = purchaseForm.current;
      alert(`The purchase is confirmed and an invoice has been sent to Your email:  ${formInfo['email'].value}`)  
      document.getElementById("confirmationForm").submit();
         
        //  return true;
      }/*else{
          // return false;
      }  
  }*/

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

  return (
      <div >
          <body>
              
              <div class={'select-delivery'} >
                  {/*TODO:
                  Change which confirmation form will be shown. If another delivery adDRESS läga till input
                  om ej då låt den få info från JWTn/API AKA har en skriftligt fält som fylls automatiskt
                  */}
                <select>
                      {selectDeliveryOptions.map((choise)=>(
                          <option value={choise.value}>{choise.label}</option>
                      ))}
                </select>
              </div>

              <div id={'purchaseDiv'}>
     
                <p>Delivery information</p>

                  {/*just nu som input, men i framtiden får informatiuon från login*/}
                <form ref={purchaseForm}>

                    <h3>First name</h3>
                    <input type={'text'} name={'firstname'} onInput={e => setInputFirstN(e.target.value)} ></input>

                    <h3>Last name</h3>
                    <input type={'text'} name={'lastname'} onInput={e => setInputLastN(e.target.value)}  ></input>

                    <h3>Payers Email</h3>
                    <input type={'email'} name={'email'} onInput={e => setInputEmail(e.target.value)} ></input>

                    <h3>Delivery Address Field 1</h3>
                    <input type={'text'} name={'address1'} onInput={e =>  setInputAd1(e.target.value)} ></input>

                    <h3>Zipcode</h3>
                    <input type={'number'} name={'address2'} onInput={e =>  setInputAd2(e.target.value)} ></input> 

                </form>

                <br></br>

                <button class={'confirmationButton'} onClick={continu}>Confirm purchase</button>

              </div>
          
              <div id={'confirmationDiv'} >
                <form id={'confirmationForm'} >
                    <h3>Name</h3>   
                    <input value={inputFirstN} readOnly />
                    <input value={inputLastN} readOnly />
                    <h3>Email</h3>   
                    <input value={inputEmail} readOnly />
                    <h3>Address</h3>
                    <input value={inputAd1} readOnly />
                    <input value={inputAd2} readOnly  />
                <br></br>
                    <input class={'confirmationButton'} type="button" onClick={alertClickEvent} value={'Submit'}></input>
                    

                 </form>
                 <button class={'goBackButton'} onClick={continu}>Go back</button>
              </div>
             
          </body>
      </div>
     
  );
  }



export default Checkout
