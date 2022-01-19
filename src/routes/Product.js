import './styles/Products.css'

const Product = ({name, price, rating, image}) => {
    <div class="product-single">
        <div>
            <img />
        </div>
        <div>
            <h1>{name}</h1>
            <p>{price}</p>
            <button className="product--button-cart">Add to cart</button>        
        </div>

    </div>

}

export default Product