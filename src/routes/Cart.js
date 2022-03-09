import { useState, useEffect } from "react"
import { fetchCartContent } from "../Utils/Common";
import CartEntry from "./CartEntry";
import EmptyCartButton from "./Components/EmptyCartButton";
// import { useCookies } from 'react-cookie';
// import { tokenToJson } from "../Utils/Common";


const axios = require('axios')

const Cart = () => {
    const [cartProducts, setCart] = useState([]);
    const [rerender, setRerender] = useState(false);
    //const [cookies, setCookie, removeCookie] = useCookies(['user-session']);
    //const [cookies, setCookie] = useCookies(["user-session"]);
    // const [userid, setUserid] = useState('');

 

    const reloadThing = () => {
        console.log("make it render");
        setRerender({});
    }






    if(cartProducts.length == 0){
        var theToken = sessionStorage.getItem("accessToken");
        var theUser = sessionStorage.getItem("user-session");
        console.log(theUser)
        console.log("test")
        axios.get(`https://cna-cart-api.herokuapp.com/cart/${theUser}`, {
          headers: {
            Authorization: `Bearer ${theToken}`
          }
       }).then(res => {
                const datas = res.data
                console.log("make it fly", datas);
                const prods = []
                for(let k = 0; k < datas.length; k++){

                        console.log(k, datas[k].pId);

                        axios.get("https://cna22-products-service.herokuapp.com/product/"+datas[k].pId)
                            .then((datum => {
                            console.log("Datum", datum)
                            const newItem = {
                                pid: datas[k].pId,
                                quantity: datas[k].productAmount,
                                name: datum.data.name,
                                desc: datum.data.description,
                                rating: datum.data.rating,
                                price: datum.data.price,
                                imageUrl: datum.data.imageURLs[0],
                                
                            };


                            prods.push(newItem);
                            setCart(prods);
                    })
                    ).then(() => reloadThing());
                    }
                    console.log("wasd", prods)
                    //setCart(prods);
                }
                )
    }

    console.log(cartProducts.length)
    const productEls = cartProducts.map(e => <CartEntry key={e.pid} pid={e.pid} id={e.id} name={e.name} desc={e.desc} price={e.price} rating={e.rating} imageUrl={e.imageUrl} quantity={e.quantity} />)

    return(
        <section className="products">
            <h1>Hello Cart</h1>
            <EmptyCartButton />
            {/* <button value="Test reload" onClick={reloadThing}> Reload</button> */}

            {productEls}

        </section>
    )


}

export default Cart

