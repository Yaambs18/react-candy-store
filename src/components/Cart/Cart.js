import { useContext } from "react";
import { Modal } from "react-bootstrap";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `Rs ${cartCtx.totalAmount.toFixed(2)}`;

    const cartItems = cartCtx.items.map(item => {
        return (
            <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                amount={item.quantity}
                price={item.price}
            />
        )
    })

    return (
        <Modal show={true} onHide={props.onCartClick} centered backdrop='static'>
            <Modal.Header>
                <Modal.Title>Your Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    cartCtx.items.length === 0 &&
                    <p>Your cart is empty.</p>
                }
                {
                    cartCtx.items.length > 0 &&
                    <ul className="list-group">
                        { cartItems}
                    </ul>
                }
                {
                    cartCtx.items.length > 0 &&
                    <div className="modal-body d-flex justify-content-between">
                        <h4>Total Amount: </h4>
                        <h4>Rs {cartCtx.totalAmount.toFixed(2)}</h4>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                { cartCtx.items.length > 0 && 
                    <button className="btn btn-primary">
                        Order
                    </button>
                }
                <button className="btn btn-secondary" onClick={props.onClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default Cart;