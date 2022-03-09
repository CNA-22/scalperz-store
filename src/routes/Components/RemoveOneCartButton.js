import '../styles/CartButton.css'
import { removeOneFromCart } from '../../Utils/Common'

const RemoveOneButton = ({pid}) => (
    <button className="product--button-cart button--active" onClick={() => removeOneFromCart(pid)}>Remove</button>
)

export default RemoveOneButton