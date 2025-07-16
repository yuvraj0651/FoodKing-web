import ReactDOM from "react-dom";
import "./Modal.css";
import { useContext, useState } from "react";
import { CartContext } from "../context/cart/cartContext";
import Checkout from "../Checkout/Checkout";

const Modal = ({ children, onClose }) => {

    const { cart, dispatch } = useContext(CartContext);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleClearCart = () => {
        dispatch({
            type: "CLEAR_CART",
        })
    }

    const handleOrderConfirmation = () => {
        alert("Your order has been placed successfully");
        dispatch({ type: "CLEAR_CART" });
        setShowCheckout(false); 
    };

    const toggleCheckout = () => {
        if (cart.length > 0) {
            setShowCheckout(prev => !prev);
        }
    }

    return ReactDOM.createPortal(
        <div className="cart-modal__overlay" onClick={onClose}>
            <div
                className="cart-modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="cart-modal__buttons cart-action__button">
                    <button
                        className="order-btn"
                        onClick={toggleCheckout}
                        disabled={cart.length === 0}
                    >
                        {showCheckout ? "Back to Cart" : "Checkout"}
                    </button>
                    <button className="cart-modal__close cart-action__button" onClick={onClose}>Close</button>
                </div>
                {children}
                {showCheckout &&
                    <Checkout cartItems={cart}
                        onBack={toggleCheckout}
                        onOrderConfirmed={handleOrderConfirmation } />}
            </div>
        </div>

        ,
        document.getElementById("modal-root")
    );
};

export default Modal;
