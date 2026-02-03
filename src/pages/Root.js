
import Header from '../layouts/Header';
import { NavLink, Outlet, useLocation } from "react-router-dom";

import '../App.css';
import { Button } from 'react-bootstrap';

const Root = () => {
    const location = useLocation();
    
    return (
        <div className='App'>
            <Header />
            <main className='container'>
                {/* <h1>Welcome to Candy Store</h1> */}
                { location.pathname.endsWith("/") && <NavLink to='/candies'>
                    <Button variant="primary">Shop Now</Button>
                </NavLink>}
                <Outlet />
            </main>
        </div>
    )
}

export default Root;