import { useContext } from "react";
import CartContext from "../../store/CartContext";

import "./CartItem.css";
import { Button } from "react-bootstrap";

const CartItem = (props) => {
    const cartCtx = useContext(CartContext);

    const removeItemHandler = () => {
        cartCtx.removeItem(props.id);
    }

    const addItemHandler = () => {
        cartCtx.addItem({ id: props.id, name: props.name, price: props.price, quantity: 1 });
    }
    return (
        <li className="cart-item">
            <div>
                <h2>{props.name}</h2>
                <div className="summary">
                    <span className="price">Rs {props.price}</span>
                    <span className="amount">X{props.amount}</span>
                </div>
            </div>
            <div className="actions">
                <Button onClick={removeItemHandler}>-</Button>
                <Button onClick={addItemHandler}>+</Button>
            </div>
        </li>
    )
}

export default CartItem;