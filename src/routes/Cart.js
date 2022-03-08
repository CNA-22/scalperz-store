import { useState, useEffect } from "react"
import { fetchCartContent } from "../Utils/Common";
import CartEntry from "./CartEntry";
import EmptyCartButton from "./Components/EmptyCartButton";
import { useCookies } from 'react-cookie';


const axios = require('axios')

const Cart = () => {
    const [cartProducts, setCart] = useState([]);
    const [rerender, setRerender] = useState(false);

    const getCookieToken = () => {
        return cookies["user-session"] || null;
      }

      const [cookies, setCookie, removeCookie] = useCookies(['user-session']);

      
      const access_token=getCookieToken()

      sessionStorage.setItem("accessToken", access_token);
    //sessionStorage.setItem("user", userid);

 

    const reloadThing = () => {
        console.log("make it render");
        setRerender({});
    }
    console.log(cartProducts)
    if(cartProducts.length === 0){
        fetchCartContent()
            .then(datas => {

                if(cartProducts.length === 0){
                let prods = []
                for(let k = 0; k < datas.length; k++){

                        console.log(k, datas[k].pId);

                        axios.get("https://cna22-products-service.herokuapp.com/product/"+datas[k].pId)
                            .then((datum => {
                            console.log(datum)
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
                    })
                    )
                    }
                    setCart(prods);

                }
            }
            )
        }

    
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

