import '../styles/CartButton.css'
import { addToCart } from '../../Utils/Common'

const CartButton = ({id}) => (
    <button className="product--button-cart" onClick={() => addToCart(id)}>Add to cart</button>
)

export default CartButton