import { useState } from "react"
import Product from "./Product"
const axios = require('axios')

const Products = () => {
    const [products, setProducts] = useState([])
    
    // Get products if state is empty
    if(products.length == 0){
        axios.get("https://cna22-products-service.herokuapp.com/products")
        .then((res) => {
            const data = res.data
            const items = data.items
            
            setProducts(items)
        })
    }
    // Generate Product elements from the received array
    const productEls = products.map(e => <Product key={e.pid} id={e.pid}name={e.name} desc={e.description} price={e.price} rating={e.rating} imageUrl={e.imageURLs[0]} />)
    
    return(
        <section className="products">
            <h1>Products</h1>
            {productEls}
        </section>
    )
}

export default Products