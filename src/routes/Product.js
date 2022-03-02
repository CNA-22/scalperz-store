import './styles/Products.css'
import { Link } from 'react-router-dom'
import { generateStarRating } from '../Utils/Common';
import CartButton from './Components/CartButton';
import getCookieToken from '../App';
const axios = require('axios');



//this is run inside of addToCart right now, really just a placeholder, since the API will return an empty object and cannot be POSTed to
//later, some kind of event would run this, so that it will show cart contents when needed
// const fetchCartContent = () => {

//     const access_token = getCookieToken();
//     const userid = getCookieToken();
//     console.log(userid);

//     return axios.get(`https://cna-cart-api.herokuapp.com/cart/${userid}`, { headers: { Authorization: `Bearer ${access_token}` }} )
//           .then((response) => console.log("this is the current cart from API: ", response.data));
//         }


// let cartList = [];

// const addToCart = (product) => {

//    // fetchCartContent();

//     //this is a simple way of handling different results for the addToCart function
//     //if the URL includes the string "products", addToCart will add product to cart
//     //otherwise, it would delete it (TODO)
//     if(document.URL.includes("products")){

//         console.log("Added", product, "to cart");

//         cartList = cartList.concat(product);
    
//         //console.log("This is an array containing the IDs of items that have been selected: ", cartList);
        
//         //a cookie is created containing a JSON'd string with the id
//         document.cookie = JSON.stringify(cartList);
    
//         //console.log("This is a cookie containing the array of IDs: ", document.cookie);
//      }
     
//      else if(document.URL.includes("cart")){
//         console.log("this would remove ", product, " from cart list once fully implemented")
//      }

    


//     //this part will throw up some CORS errors right now
//     //now it's JWT auth error
//     //from cart-service readme: MUST HAVE A HEADER CALLED "Authorization:" and has the value "Bearer token"
//     const toAdd = { "pId": product,
//                     "productAmount": 1,
//                     "userId": 1};
//     axios.post('https://cna-cart-api.herokuapp.com/cart', {headers: { Authorization: `Bearer 2`}}, toAdd)
//         //.then(response => this.setState({ articleId: response.data.id }))
//         ;

    
//}



//const generateStarRating = (n) => {
//    n = Math.round(n*10)
//    let starRating = ""
//    for(let i=1; i<=10; i++){
//        starRating += (i <= n ? "★" : "☆")
//    }
//    return starRating
//}


const Product = ({name, price, desc, rating, imageUrl, id}) => {

    const description = desc.substr(0, 200)
    return(
    <div className="product">
        <div className="product--image_wrapper">
            <Link to={"/product/"+id}>
                    <img src={imageUrl} />
            </Link>
            
        </div>
        <div className="product--info">
            <h1><Link to={"/product/"+id}>{name}</Link></h1>
            <p>{price}€</p>
            <p>{description}...<Link to={"/product/"+id}>read more</Link> </p>
            <p>{generateStarRating(rating)}</p>
            <CartButton id={id}/>
        </div>

    </div>
    )

}

export default Product