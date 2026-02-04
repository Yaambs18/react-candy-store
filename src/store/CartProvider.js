import { useContext, useEffect, useReducer } from "react";
import CartContext from "./CartContext";
import AuthContext from "./AuthContext";

const initialCartState = {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
};

const cartReducer = (state, action) => {
    if (action.type === 'REPLACE_ITEMS') {
        return {
            ...state,
            items: action.items,
            totalAmount: action.totalAmount
        }
    } 
    else if (action.type == 'ADD') {
        const updatedTotalAmount = (+state.totalAmount || 0) + +action.item.price * action.item.quantity;

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems = [...state.items];
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.item.quantity
            };
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = updatedItems.concat(action.item);
        }
        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    } else if (action.type == 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

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

    const authCtx = useContext(AuthContext);

    const apiUrl = `https://crudcrud.com/api/51b58b84bfad4b32bdee9debf7acc2a4/${authCtx.userEmail.replace(/[@.]/g, '')}cart`;

    useEffect(() => {
        async function fetchCart() {
            try {
                const response = await fetch(
                    `${apiUrl}`
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error.message);
                }
                const totalAmount = data.reduce((currSum, item) => currSum + (item.price * item.quantity), 0);
                dispatchCartAction({ type: 'REPLACE_ITEMS', items: data, totalAmount });
            } catch (error) {
                console.error("Failed to fetch user cart: ", error.message);
            } 
        }
        fetchCart();

    }, [apiUrl, authCtx.userEmail]);
    const addItemCartHandler = async item => {
        try {
            const existingCartItemIndex = cartState.items.findIndex(cartItem => {
                return cartItem.id === item.id;
            });
            const existingCartItem = cartState.items[existingCartItemIndex];
            const { _id, ...itemWithoutID } = existingCartItem;
            if (existingCartItem) {
                const updatedItem = {
                    ...itemWithoutID,
                    quantity: existingCartItem.quantity + item.quantity
                };
                const response = await fetch(
                    `${apiUrl}/${_id}`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(updatedItem),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                if (!response.ok) {
                    throw new Error(data.error.message);
                }
                dispatchCartAction({ type: 'ADD', item: item });
                return;
            }
            const response = await fetch(
                apiUrl,
                {
                    method: 'POST',
                    body: JSON.stringify(item),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message);
            }
            dispatchCartAction({ type: 'ADD', item: data });
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    }

    const removeItemCartHandler = async id => {
        const existingCartItemIndex = cartState.items.findIndex(cartItem => {
            return cartItem.id === id;
        });
        const existingCartItem = cartState.items[existingCartItemIndex];
        const { _id, ...itemWithoutID } = existingCartItem;

        if (!existingCartItem) {
            return;
        }
        if (existingCartItem.quantity === 1) {
            const response = await fetch(
                `${apiUrl}/${_id}`,
                {
                    method: 'DELETE',
                }
            );
            if (!response.ok) {
                throw new Error("Failed to remove cart item");
            }
        } else {
            const updatedItem = {
                ...itemWithoutID,
                quantity: existingCartItem.quantity - 1
            };
            const response = await fetch(
                `${apiUrl}/${_id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(updatedItem),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (!response.ok) {
                throw new Error("Failed to remove cart item");
            }
        }
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