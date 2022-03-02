import getCookieToken from '../App';
import getAccessToken from '../App';
import token from '../App';
import userid from '../App';
const axios = require('axios');
//const userid = getCookieToken();
//const access_token = getCookieToken();




export const generateStarRating = (n) => {
    n = Math.round(n*10)
    let starRating = ""
    for(let i=1; i<=10; i++){
        starRating += (i <= n ? "★" : "☆")
    }
    return starRating
}

export const addToCart = (id) => {

  //const token = getAccessToken();

  //var what = fetchCartContent();

  var theToken = sessionStorage.getItem("accessToken");
  var theUser = sessionStorage.getItem("user");

  console.log("Added", id, "to cart! ", theToken);
  console.log(theUser);
  // const userid = getCookieToken();
  //const access_token = getCookieToken();
  let idText = id.toString();


  const toAdd = { "pId": idText,
                  "productAmount": 1,
                  "userId": theUser};

  console.log(toAdd);

  axios.post(`https://cna-cart-api.herokuapp.com/cart`, toAdd, {
      headers: {
        Authorization: `Bearer ${theToken}`
      }
    })
    //, toAdd)
  .then((response) => console.log("this is the current cart being POSTed: ", response.data));
}

export const fetchCartContent = () => {

   var theToken = sessionStorage.getItem("accessToken");
   var theUser = sessionStorage.getItem("user");


  return axios.get(`https://cna-cart-api.herokuapp.com/cart/${theUser}`, {
     headers: {
       Authorization: `Bearer ${theToken}`
     }
  })
        .then((response) => console.log("this is the current cart GET: ", response.data));
      }