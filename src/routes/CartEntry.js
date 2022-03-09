import './styles/Products.css'
import { Link } from 'react-router-dom'
import { generateStarRating } from '../Utils/Common';
import RemoveOneButton from './Components/RemoveOneCartButton';


const CartEntry = ({name, price, desc, rating, imageUrl, id, quantity, pid}) => {

    const description = desc.substr(0, 200)
    return(
    <div className="product">
        <div className="product--image_wrapper">
            <Link to={"/product/"+pid}>
                    <img src={imageUrl} />
            </Link>
            
        </div>
        <div className="product--info">
            <h1><Link to={"/product/"+pid}>{name}</Link></h1>
            <p>Currently in cart: {quantity}</p>
            <p>{price}€</p>
            <p>{description}...<Link to={"/product/"+pid}>read more</Link> </p>
            <p>{generateStarRating(rating)}</p>
            <RemoveOneButton pid={pid}/>
        </div>

    </div>
    )

}

export default CartEntry