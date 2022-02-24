import { useState } from 'react'
import { useParams } from 'react-router'
import { generateStarRating } from '../Utils/Common'
import './styles/SingleProduct.css'
import CartButton from './Components/CartButton'

const axios = require('axios')

const SingleProduct = () => {
    const id = useParams().id || "0"
    const [product, setProduct] = useState({name: '', price: 0, rasting: 0, description: '', chip: '', memory:'', packageDimensions:{width:0, height:0, depth:0}, packageWeight:0, imageURLs: [0]})
    if(product.name  === ''){
        axios.get("https://cna22-products-service.herokuapp.com/product/"+id)
        .then((res) => {
            setProduct(res.data)
        })
    }
    console.log(product)
    return(
        <div className="single-product">
            <div className="single-product--header">
                <div className="single-product--info">
                    <h1>{product.name}</h1>
                    <p>{generateStarRating(product.rating)}</p>
                    <p className="single-product--price">{product.price}€</p>
                    <CartButton id={id} />
                </div>
                <div className="single-product--image">
                    <img src={product.imageURLs[0]} />
                </div>
            </div>
            <p>{product.description}</p>
            <h2>Technical details</h2>
            <p>Chip: {product.chip}</p>
            <p>Memory: {product.memory}Gb</p>
            <h2>Package details</h2>
            <p>Package dimensions:</p>
            <ul>
                <li>Width: {product.packageDimensions.width}mm</li>
                <li>Height: {product.packageDimensions.height}mm</li>
                <li>Depth: {product.packageDimensions.depth}mm</li>
            </ul>
            <p>Weight: {product.packageWeight}g</p>
        </div>
    )
}
export default SingleProduct