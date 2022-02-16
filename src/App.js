import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css';
import Pages from './routes';

const [Cart, Checkout, Products] = Pages

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/products">Products</Link> 
        <Link to="/cart">Cart</Link>
      </nav>
      <Routes>
        <Route path="products" element={<Products />}/>
        <Route path="cart" element={<Cart />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
