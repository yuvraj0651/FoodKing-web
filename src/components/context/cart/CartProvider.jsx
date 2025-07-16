import { useEffect, useReducer } from 'react';
import { cartReducer } from "./cartReducer";
import { CartContext } from './cartContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const CartProvider = ({ children }) => {

    const [storedCart, setStoredCart] = useLocalStorage("cart", []);

    const initialState = {
        cart: Array.isArray(storedCart) ? storedCart : []
    }

    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        setStoredCart(state.cart)
    }, [state.cart])

    return (
        <CartContext.Provider value={{ cart: state.cart, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider