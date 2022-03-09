import '../styles/CartButton.css'
import { removeAllFromCart } from '../../Utils/Common'

const EmptyCartButton = () => (
    <button className="product--button-cart button--active" onClick={() => removeAllFromCart()}>Empty cart</button>
)

export default EmptyCartButton