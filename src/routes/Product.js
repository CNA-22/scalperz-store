import './styles/Products.css'
import { Link } from 'react-router-dom'
import { generateStarRating } from '../Utils/Common';
import CartButton from './Components/CartButton';
import { useState } from 'react';
const axios = require('axios');


const Product = ({name, price, desc, rating, imageUrl, id}) => {
    const [stock, setStock] = useState(0)
    const token = sessionStorage.getItem("accessToken");

    axios.get(("https://cna-inventory-service.herokuapp.com/products/" + id), {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => {setStock(data.data.antal)})
    
    const inStock = (stock > 0) //hardcoded data until inventory service works again, this will be replaced by a request and a state
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
            <CartButton id={id} active={inStock}/>
        </div>

    </div>
    )

}

export default Product