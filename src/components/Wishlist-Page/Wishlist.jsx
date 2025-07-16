import { useContext } from 'react';
import "./Wishlist.css";
import { Container } from 'react-bootstrap';
import { WishlistContext } from '../context/wishlist/wishlistContext';
import { CartContext } from '../context/cart/cartContext';

const Wishlist = ({ onClose }) => {

    const { wishlist, dispatch } = useContext(WishlistContext);
    const { dispatch: cartDispatch } = useContext(CartContext);

    const increaseQuantity = (id) => {
        dispatch({
            type: "INCREASE_WISHLIST_QUANTITY",
            payload: { id }
        })
    };

    const decreaseQuantity = (id) => {
        dispatch({
            type: "DECREASE_WISHLIST_QUANTITY",
            payload: { id }
        })
    };

    const removeItem = (id) => {
        dispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload: { id }
        })
    };

    const addProductToCart = (product) => {
        cartDispatch({
            type: "ADD_CART_ITEM",
            payload: product,
        })
        removeItem(product.id);
        // onClose();
    }

    return (
        <>
            <section>
                <div className="wishlist-section">
                    <Container fluid>
                        <div className="wishlist-section__inner">
                            <div className="wishlist-detail__table-block">
                                <button className="modal-close-btn" onClick={onClose}>×</button>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product-Image</th>
                                            <th>Product-Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Product-Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            wishlist.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5}>Your Wishlist Is Empty</td>
                                                </tr>
                                            ) : (
                                                wishlist.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <img src={item.image} alt={item.title} className='img-fluid' />
                                                        </td>
                                                        <td><span>{item.title}</span></td>
                                                        <td>
                                                            <div className="product-quantity">
                                                                <button
                                                                    className="product-qty increase-qty"
                                                                    onClick={(e) => increaseQuantity(item.id)}
                                                                >
                                                                    +
                                                                </button>
                                                                <span className='qty-count'>
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    className="product-qty decrease-qty"
                                                                    onClick={(e) => decreaseQuantity(item.id)}
                                                                >
                                                                    -
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td><span>${(item.newPrice * item.quantity).toFixed(2)}</span></td>
                                                        <td>
                                                            <div className="product-actions__block">
                                                                <div className="product-remove">
                                                                    <button
                                                                        className="remove__btn action_btn"
                                                                        onClick={(e) => removeItem(item.id)}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                                <div className="add-cart__button-block">
                                                                    <button
                                                                        className="add__btn action_btn"
                                                                        onClick={(e) => addProductToCart(item)}
                                                                    >
                                                                        Add To Cart
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default Wishlist