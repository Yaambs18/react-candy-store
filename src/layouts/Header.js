import { Button } from "react-bootstrap";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";

const Header = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const loginClickHandler = () => {
        navigate('/auth');
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md">
                <ul className="navbar-nav">
                    <Link to='/' className="nav-link">
                        <li className="nav-item">Candy Store</li>
                    </Link>
                    <li className="nav-item cart">
                        <Button variant="secondary" className="cart-button" onClick={props.onCartClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg> Cart ({2})
                        </Button>
                    </li>
                    { !authCtx.isLoggedIn &&
                        <li className="nav-item">
                            <Button className="login-button" onClick={loginClickHandler}>
                                Login
                            </Button>
                        </li>
                    }
                    { authCtx.isLoggedIn &&
                        <li className="nav-item">
                            <Button className="logout-button" onClick={authCtx.onLogout}>
                                Logout
                            </Button>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;