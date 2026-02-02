import { useReducer } from "react";
import CartContext from "./CartContext";

const initialCartState = {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
};

const cartReducer = (state, action) => {
    if (action.type == 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItem;

        const updatedItems = [...state.items];
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.item.quantity
            };
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            const updatedItems = updatedItems.concat(action.item);
        }
        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    } else if (action.type == 'REMOVE') {
        const updatedTotalAmount = state.totalAmount - action.item.price;
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity == 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return  {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    } else if (action.type == 'CLEAR') {
        return {
            ...state,
            items: [],
            totalAmount: 0,
        }
    } else {
        return state;
    }
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCartState);

    const addItemCartHandler = item => {
        dispatchCartAction({ type: 'ADD', item: item });
    }

    const removeItemCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    }

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    }

    return (
        <CartContext.Provider value={{
            items: cartState.items,
            totalAmount: cartState.totalAmount,
            addItem: addItemCartHandler,
            removeItem: removeItemCartHandler,
            clearCart: clearCartHandler
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;