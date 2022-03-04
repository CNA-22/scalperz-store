import './styles/Products.css'
import { Link } from 'react-router-dom'
import { generateStarRating } from '../Utils/Common';
import RemoveOneButton from './Components/RemoveOneCartButton';


const CartEntry = ({name, price, desc, rating, imageUrl, id, quantity, pid}) => {

    //const description = desc.substr(0, 200)
    return(
    <div className="product">
        <div className="product--image_wrapper">
            <Link to={"/product/"+id}>
                    <img src={imageUrl} />
            </Link>
            
        </div>
        <div className="product--info">
            <h1><Link to={"/product/"+id}>{name}</Link></h1>
            <p>Currently in cart: {quantity}</p>
            <p>{price}€</p>
            <p>{desc}...<Link to={"/product/"+id}>read more</Link> </p>
            <p>{generateStarRating(rating)}</p>
            <RemoveOneButton pid={pid}/>
        </div>

    </div>
    )

}

export default CartEntry