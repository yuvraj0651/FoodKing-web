import React, { useContext } from 'react';
import CartItem from '../Cart/CartItem';
import { CartContext } from '../context/cart/cartContext';

const Cart = () => {

    const { cart, dispatch } = useContext(CartContext);

    const handleRemove = (id) => {
        dispatch({
            type: "REMOVE_CART_ITEM",
            payload: { id }
        })
    }

    const increaseQuantity = (id) => {
        dispatch({
            type: "INCREASE_CART_QUANTITY",
            payload: { id }
        })
    }

    const decreaseQuantity = (id) => {
        dispatch({
            type: "DECREASE_CART_QUANTITY",
            payload: { id }
        })
    }

    return (
        <>
            <CartItem
                cartData={cart}
                handleRemove={handleRemove}
                handleIncrease={increaseQuantity}
                handleDecrease={decreaseQuantity} />
        </>

    )
}

export default Cart