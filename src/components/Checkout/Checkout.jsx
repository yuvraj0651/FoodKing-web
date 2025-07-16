import { useState } from 'react';
import "./Checkout.css";
import { Container} from "react-bootstrap";

const Checkout = ({ cartItems, onBack, onOrderConfirmed }) => {

    const [email, setEmail] = useState("");
    const [address, setAddress] = useState({
        line1: "",
        city: "",
        postal: "",
        country: ""
    });
    const [payment, setPayment] = useState({
        cardNumber: "",
        expiry: "",
        cvc: ""
    });

    const subtotal = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + item.newPrice * item.quantity, 0)
        : 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        onOrderConfirmed();
        onBack();
    }

    return (
        <>
            <section>
                <div className="checkout-form__section">
                    <Container fluid>
                        <div className="checkout-form__inner">
                            <div className="checkout-form__top">
                                <h4>Checkout Form</h4>
                            </div>
                            <div className="checkout-form__bottom">
                                <div className="checkout-order__summary">
                                    <h4>Order Summary - </h4>
                                    <ul>
                                        {
                                            cartItems.map((item) => (
                                                <li key={item.id}>
                                                    {item.title} × {item.quantity} — ${(item.newPrice * item.quantity).toFixed(2)}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                                </div>
                                <hr />
                                <div className="checkout-form__block">
                                    <form onSubmit={handleSubmit}>
                                        <div className="checkout-input__box">
                                            <div className="checkout-input__block">
                                                <label htmlFor="" className='checkout-label__text'>Contact Information - </label>
                                                <input
                                                    type="email"
                                                    placeholder='Email'
                                                    required
                                                    className='checkout-input'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="checkout-input__box">
                                            <div className="checkout-input__block">
                                                <label htmlFor="" className='checkout-label__text'>shipping address - </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Address"
                                                    className='checkout-input'
                                                    value={address.line1}
                                                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    className='checkout-input'
                                                    placeholder="City"
                                                    value={address.city}
                                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    className='checkout-input'
                                                    placeholder="Postal Code"
                                                    value={address.postal}
                                                    onChange={(e) => setAddress({ ...address, postal: e.target.value })}
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    className='checkout-input'
                                                    placeholder="Country"
                                                    value={address.country}
                                                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="checkout-input__box">
                                            <div className="checkout-input__block">
                                                <label htmlFor="" className='checkout-label__text'>Payment Details - </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Card Number"
                                                    value={payment.cardNumber}
                                                    onChange={(e) =>
                                                        setPayment({ ...payment, cardNumber: e.target.value })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="MM/YY"
                                                    value={payment.expiry}
                                                    onChange={(e) =>
                                                        setPayment({ ...payment, expiry: e.target.value })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="CVC"
                                                    value={payment.cvc}
                                                    onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <button className='checkout-order-btn' type="submit">Place Order</button>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default Checkout