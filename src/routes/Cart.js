import { useState, useEffect } from "react"
import { fetchCartContent } from "../Utils/Common";
import CartEntry from "./CartEntry";
import EmptyCartButton from "./Components/EmptyCartButton";

const axios = require('axios')

const testdata = {"page":0,"pageSize":10,"actualSize":4,"totalPagesCount":1,"totalItemsCount":4,"items":[{"id":"694647419112","name":"GeForce RTX 3050 8 GB","description":"The GeForce RTX 3050 8 GB is a performance-segment graphics card by NVIDIA, launched on January 4th, 2022. Built on the 8 nm process, and based on the GA106 graphics processor, in its GA106-150-KA-A1 variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on GeForce RTX 3050 8 GB. Additionally, the DirectX 12 Ultimate capability guarantees support for hardware-raytracing, variable-rate shading and more, in upcoming video games.","manufacturer":"NVIDIA","price":1342,"chip":"GA106","memory":8,"rating":0.8,"imageURLs":[],"packageDimensions":{"width":35,"height":112,"depth":242},"packageWeight":1324},{"id":"952500263927","name":"AMD Radeon RX 6500 XT","description":"The Radeon RX 6500 XT is a performance-segment graphics card by AMD, launched on January 19th, 2022. Built on the 6 nm process, and based on the Navi 24 graphics processor, in its Navi 24 XT variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on Radeon RX 6500 XT. Additionally, the DirectX 12 Ultimate capability guarantees support for hardware-raytracing, variable-rate shading and more, in upcoming video games.","manufacturer":"AMD","price":324,"chip":"Navi 24","memory":4,"rating":0.8,"imageURLs":[],"packageDimensions":{"width":35,"height":112,"depth":242},"packageWeight":1324},{"id":"335172007168","name":"NVIDIA GeForce RTX 3060","description":"The GeForce RTX 3060 is a performance-segment graphics card by NVIDIA, launched on January 12th, 2021. Built on the 8 nm process, and based on the GA106 graphics processor, in its GA106-300-A1 variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on GeForce RTX 3060. Additionally, the DirectX 12 Ultimate capability guarantees support for hardware-raytracing, variable-rate shading and more, in upcoming video games.","manufacturer":"NVIDIA","price":436,"chip":"GA106","memory":4,"rating":0.8,"imageURLs":[],"packageDimensions":{"width":35,"height":112,"depth":242},"packageWeight":1324},{"id":"569720717003","name":"NVIDIA GeForce RTX 3090","description":"The GeForce RTX 3090 is an enthusiast-class graphics card by NVIDIA, launched on September 1st, 2020. Built on the 8 nm process, and based on the GA102 graphics processor, in its GA102-300-A1 variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on GeForce RTX 3090. Additionally, the DirectX 12 Ultimate capability guarantees support for hardware-raytracing, variable-rate shading and more, in upcoming video games.","manufacturer":"NVIDIA","price":1500,"chip":"GA102","memory":24,"rating":0.8,"imageURLs":[],"packageDimensions":{"width":55,"height":112,"depth":242},"packageWeight":1324}]}

const Cart = () => {
    const [cartProducts, setCart] = useState([]);
    const [rerender, setRerender] = useState(false);

    let prods = []

    const reloadThing = () => {
        console.log("make it render");
        setRerender({});
    }


    //useEffect(() => {

        fetchCartContent()
            .then(datas => {
                //prods = []

                if(cartProducts.length === 0){

                for(let k = 0; k < datas.length; k++){

                        console.log(datas[k].pId);

                        axios.get("https://cna22-products-service.herokuapp.com/product/"+datas[k].pId)
                            .then((datum => {

                            const newItem = {
                                id: datas[k].id,
                                pid: datas[k].pId,
                                quantity: datas[k].productAmount,
                                name: datum.data.name,
                                desc: datum.data.description,
                                rating: datum.data.rating,
                                price: datum.data.price,
                                imageUrl: datum.data.imageURLs[0],
                                
                            };


                            prods.push(newItem);
                        //setCart(prods);
                    })
                    )
                    //setCart(prods);
                    }
                    setCart(prods);

                }
                //reloadThing();

                //setCart(prods); loopy
            }
            
            )

      //  }
    //)

    const productEls = cartProducts.map(e => <CartEntry key={e.pid} pid={e.pid} id={e.id} name={e.name} desc={e.desc} price={e.price} rating={e.rating} imageUrl={e.imageUrl} quantity={e.quantity} />)

    return(
        <section className="products">
            <h1>Hello Cart</h1>
            <EmptyCartButton />
            <button value="Test reload" onClick={reloadThing}> Reload</button>

            {productEls}

        </section>
    )


}

export default Cart

