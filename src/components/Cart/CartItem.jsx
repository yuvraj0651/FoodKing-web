import "./CartItem.css"
import { Container } from 'react-bootstrap';
import { RiDeleteBin5Line } from "react-icons/ri";
import Checkout from "../Checkout/Checkout";

const CartItem = ({ cartData, handleRemove, handleIncrease, handleDecrease }) => {
    console.log(cartData);
    return (
        <>
            <section>
                <div className="cart-item__section">
                    <Container fluid>
                        <div className="cart-item__inner">
                            {
                                cartData.length === 0 ? (
                                    <h1 className="fallback__text">Your Cart is Empty</h1>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='custom-table-text'>Product-Image</th>
                                                <th className='custom-table-text'>Product-Name</th>
                                                <th className='custom-table-text'>Price</th>
                                                <th className='custom-table-text'>Quantity</th>
                                                <th className='custom-table-text'>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartData.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <img src={item.image} alt={item.title} className='img-fluid' />
                                                        </td>
                                                        <td className='custom-table-text'>{item.title}</td>
                                                        <td className='custom-table-text'>{item.newPrice * item.quantity}</td>
                                                        <td className='custom-table-text'>
                                                            <div className="quantity-wrapper">
                                                                <button
                                                                    className="quantity__btn increase__btn"
                                                                    onClick={(e) => handleIncrease(item.id)}
                                                                >
                                                                    +
                                                                </button>
                                                                <span className="quantity_text">{item.quantity}</span>
                                                                <button
                                                                    className="quantity__btn decrease__btn"
                                                                    onClick={(e) => handleDecrease(item.id)}
                                                                >
                                                                    -
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className='custom-table-text'>
                                                            <button className='remove-btn'
                                                                onClick={() => handleRemove(item.id)}
                                                            >
                                                                <RiDeleteBin5Line />
                                                                <span>Remove</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        <tfoot></tfoot>
                                    </table>
                                )
                            }
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default CartItem