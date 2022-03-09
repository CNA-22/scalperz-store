import '../styles/CartButton.css'
import { addToCart } from '../../Utils/Common'

const CartButton = ({id, active}) => (
    <>
    <p>{console.log("Button", active)}</p>
    <button className={"product--button-cart " + (active ? "button--active" : "button--out-of-stock")} onClick={() => addToCart(id, active)}>{active ? "Add to cart" : "Out of stock"}</button>
    </>
)

export default CartButton