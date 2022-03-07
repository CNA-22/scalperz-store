const axios = require('axios');

export const generateStarRating = (n) => {
    n = Math.round(n*10)
    let starRating = ""
    for(let i=1; i<=10; i++){
        starRating += (i <= n ? "★" : "☆")
    }
    return starRating
}

export const addToCart = (id) => {

  var theToken = sessionStorage.getItem("accessToken");
  var theUser = sessionStorage.getItem("user");

  //console.log("Added", id, "to cart! ", theToken);
  //console.log(theUser);
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
  var theUser = sessionStorage.getItem("user");

  let usertext = theUser.toString()

  const toData = {
    "userId": theUser
  };
  

  axios.delete(`https://cna-cart-api.herokuapp.com/cart/`, {
    headers: {
      Authorization: `Bearer ${theToken}`
    }
    ,
    body: {
       "userId": "620cbc0613adc765696a552b"
     }
  })
  .then((response) => console.log("delete all attempt: ", response))
}

export const removeOneFromCart = (pid) => {

  console.log(pid)

  let pidText = pid.toString();

  var theToken = sessionStorage.getItem("accessToken");
  var theUser = sessionStorage.getItem("user");

  const toRemove = {
    "pId": pidText,
    "userId": theUser,
    "productAmount": 1
};

console.log("user: ", theUser)

  axios.delete(`https://cna-cart-api.herokuapp.com/cart/`, {
    headers: {
      Authorization: `Bearer ${theToken}`
    },
    body: {
      "pId": pidText,
      "userId": theUser,
      "productAmount": 1
    }
  })
  .then((response) => console.log("single delete attempt: ", response.data))
}



export const fetchCartContent = () => {

   var theToken = sessionStorage.getItem("accessToken");
   var theUser = sessionStorage.getItem("user");


  const promise = axios.get(`https://cna-cart-api.herokuapp.com/cart/${theUser}`, {
     headers: {
       Authorization: `Bearer ${theToken}`
     }
  })
  const dataPromise = promise.then((response) => response.data)

  return dataPromise
    //    .then((response) => console.log("this is the current cart GET: ", response.data))
      }