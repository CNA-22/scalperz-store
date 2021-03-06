const axios = require('axios');

export const generateStarRating = (n) => {
    /*
    The rating of a product is a decimal number n ϵ [0-1]. A 10 star rating isn't very user friendly but was easy 
    to implement since there was no unicode char for half a star. A 5 star rating would be possible with the current 
    code, but some information would be lost
    */

    // Convert decimal to integer
    n = Math.round(n*10)
    let starRating = ""
    for(let i=1; i<=10; i++){
      // Write out 10 stars. The i-th star is filled if less than or equal to n, which results in n filled stars and empty remaining stars. 
      starRating += (i <= n ? "★" : "☆")
    }
    return starRating
}

export const addToCart = (id, active) => {
  console.log(active)
  if(!active) return 
  var theToken = sessionStorage.getItem("accessToken");
  var theUser = sessionStorage.getItem("user-session");

  //console.log("Added", id, "to cart! ", theToken);
  console.log(theUser, " ", theToken);
  let idText = id.toString();


  const toAdd = { "pId": idText,
                  "productAmount": 1,
                  "userId": theUser};

  axios.post(`https://cna-cart-api.herokuapp.com/cart`, toAdd, {
      headers: {
        Authorization: `Bearer ${theToken}`
      }
    })
    //, toAdd)
  .then((response) => console.log("this is the current cart being POSTed: ", response.data));
}

export const removeAllFromCart = () => {

  var theToken = sessionStorage.getItem("accessToken");
  var theUser = sessionStorage.getItem("user-session");

  axios.delete(`https://cna-cart-api.herokuapp.com/cart/`, {
    headers: {
      Authorization: `Bearer ${theToken}`
    }
    ,
    data: {
       "userId": theUser
     }
  })
  .then((response) => console.log("delete all attempt: ", response.data))
  .then(() => window.location.reload());
}

export const removeOneFromCart = (pid) => {

  console.log(pid)

  let pidText = pid.toString();

  var theToken = sessionStorage.getItem("accessToken");
  var theUser = sessionStorage.getItem("user-session");

  

  const toRemove = {
    "pId": pidText,
    "userId": theUser,
    "productAmount": 1
};

console.log("user: ", theUser)

  axios.delete(`https://cna-cart-api.herokuapp.com/cart/#${pid}`, {
    headers: {
      Authorization: `Bearer ${theToken}`
    },
    data: {
     // "pId": pidText,
      "userId": theUser,
      "productAmount": 1
    }
  })
  .then((response) => console.log("single delete attempt: ", response.data))
  .then(() => window.location.reload());
}






      //Hantera token
export const tokenToJson= (token) =>{
  try{

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }catch(e){
    
  }
}
