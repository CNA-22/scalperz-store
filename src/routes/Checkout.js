import { useRef } from 'react';
import './styles/Checkout.css'
    
const Checkout = () => {

    const purchaseForm= useRef(null)

    //Alert som poppar upp när man klickar på knappen. Efteråt som en 
    const alertClickEvent = () => {

        //Får information från formen
        const formInfo = purchaseForm.current;
        
        //Text som visas vid confirm flik
        let formConfirmation = `"Please check that all information is correct and press OK to confirm the order!\n
                    First name: ${formInfo['firstname'].value}\n
                    Last name: ${formInfo['lastname'].value}\n
                    Email: ${formInfo['email'].value}\n
                    Adress field 1: ${formInfo['address1'].value}\n
                    Adress field 2: ${formInfo['address2'].value}\n`;

        //om man trycker på OK knappen får man en alert
        if (window.confirm(formConfirmation) === true) {
            alert(`The purchase is confirmed and an invoice has been sent to Your email:  ${formInfo['email'].value}`)  
          //  return true;
        }/*else{
            // return false;
        }*/   
    }
    return (
        <div >
            <body>
                <div class={'purchaseDiv'}>
       
                    <p>Delivery information</p>

                    {/*just nu som input, men i framtiden får informatiuon från login*/}
                    <form ref={purchaseForm}>{/*onSubmit='return alertClickEvent()'>*/}

                        <h3>First name</h3>
                        <input type={'text'} name={'firstname'} ></input>

                        <h3>Last name</h3>
                        <input type={'text'} name={'lastname'} ></input>

                        <h3>Payers Email</h3>
                        <input type={'email'} name={'email'} ></input>

                        <h3>Delivery Address Field 1</h3>
                        <input type={'text'} name={'address1'} ></input>

                        <h3>Delivery Address Field 2</h3>
                        <input type={'text'} name={'address2'} ></input>
                         {/* TODO: Få samma sak som med button att funka med submit. Just nu submittar det formen oavsett vad. även om return är false
                         <input type="submit" onClick="return alertClickEvent();"></input>
                        <input type="submit" ></input>
                        */}  
                    </form>
       
                </div>
               
               <br></br>
               
               <p><b>Total amount:</b> the ammount here</p>
               
               <button onClick={alertClickEvent}>Confirm purchase</button>
               
            </body>
        </div>
           
    );
}

export default Checkout