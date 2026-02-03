
import Header from '../layouts/Header';
import CartProvider from '../store/CartProvider';
import { NavLink, Outlet, useLocation } from "react-router-dom";

import '../App.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Cart from '../components/Cart/Cart';

const Root = () => {
    const location = useLocation();
    
    const [showCart, setShowCart] = useState(false);

    const handleCartClick = () => {
        setShowCart(!showCart);
    }
    
    return (
        <CartProvider>
            <div className='App'>
                <Header onCartClick={handleCartClick} />
                <main className='container'>
                    {/* <h1>Welcome to Candy Store</h1> */}
                    { location.pathname.endsWith("/") && <NavLink to='/candies'>
                        <Button variant="primary">Shop Now</Button>
                    </NavLink>}
                    { showCart && 
                        <Cart onClose={handleCartClick} />
                    }
                    <Outlet />
                </main>
            </div>
        </CartProvider>
    )
}

export default Root;