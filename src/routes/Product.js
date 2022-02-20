import './styles/Products.css'
import { Link } from 'react-router-dom'
import { generateStarRating } from '../Utils/Common';
const addToCart = (product) => {
    console.log("Added", product, "to cart");
}


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
            <button className="product--button-cart" onClick={() => addToCart(id)}>Add to cart</button>        
        </div>

    </div>
    )

}

export default Product