import "./Product.css";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { Container } from 'react-bootstrap';
import { useContext } from "react";
import { CartContext } from "../context/cart/cartContext";
import { WishlistContext } from "../context/wishlist/wishlistContext";
import { usePagination } from "../context/pagination/PaginationProvider";

const Products = ({ getProducts, filterSearch }) => {

    const { offset, itemsPerPage } = usePagination();
    const pageItems = getProducts.slice(offset, offset + itemsPerPage)

    // console.log(filterSearch);

    // const products = props.getProducts;
    const itemsToShow = filterSearch.slice(offset, offset + itemsPerPage);

    const { dispatch: cartDispatch, cart } = useContext(CartContext);
    const { dispatch: wishlistDispatch } = useContext(WishlistContext);
    // const { productsState } = useContext(ProductsContext);

    const dummyUser = {
        name: "Yuvraj",
        email: "yuvraj0651@gmail.com"
    }

    // const handleAddToCart = (product) => {
    //     cartDispatch({
    //         type: "ADD_CART_ITEM",
    //         payload: product
    //     });
    // }

    const submitOrderHandler = (userData, product) => {
        cartDispatch({
            type: "ADD_CART_ITEM",
            payload: product
        });

        fetch("https://food-web-db01-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cart
            }),
        })
            .then(res => res.json())
            .then(data => console.log("Data Sent:", data))
            .catch(err => console.error("Error:", err));
    };

    const submitWishlistHandler = (userData, product) => {
        wishlistDispatch({
            type: "ADD_TO_WISHLIST",
            payload: product
        })

        fetch("https://food-web-db01-default-rtdb.firebaseio.com/wishlist.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: product
            }),
        })
            .then(res => res.json())
            .then(data => console.log("Wishlist Data Sent", data))
            .catch(err => console.log("Error:", err))
    };

    // const handleAddToWishlist = (product) => {
    //     wishlistDispatch({
    //         type: "ADD_TO_WISHLIST",
    //         payload: product
    //     })
    // }

    return (
        <>
            <section className='section-padding'>
                <div className="product-card__section">
                    <Container fluid>
                        <div className="product-section__inner">
                            {
                                itemsToShow.map((product) => (
                                    <div className="product-card" key={product.id}>
                                        <div className="product-actions">
                                            <div className="wishlist_button-block">
                                                <button
                                                    type="button"
                                                    className="product-wishlist__block action-box"
                                                    onClick={(e) => submitWishlistHandler(dummyUser, product)}
                                                >
                                                    <IoIosHeart className="actions-icon" />
                                                </button>
                                            </div>
                                            <div className="visible-action-block">
                                                <div className="cart-button__block">
                                                    <button
                                                        onClick={(e) => submitOrderHandler(dummyUser, product)}
                                                        className="product-cart__block action-box">
                                                        <IoBagHandleSharp className="actions-icon" />
                                                    </button>
                                                </div>
                                                <div className="product-details__viewer action-box">
                                                    <FaEye className="actions-icon" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-card__image">
                                            <img src={product.image} alt="product-image-1" className='img-fluid product__pic' />
                                        </div>
                                        <div className="product-card__content">
                                            <div className="product__add-to-cart">
                                                <button onClick={() => submitOrderHandler(dummyUser, product)}><IoBagHandleSharp /><span>Add To Cart</span></button>
                                            </div>
                                            <div className="product-price">
                                                <div className="discount-badge">
                                                    <span>{product.discount}%</span>
                                                </div>
                                                <div className="price">
                                                    <span className='old-price'>${product.oldPrice}</span>
                                                    <span className="new-price">${product.newPrice}</span>
                                                </div>
                                            </div>
                                            <div className="product-title">
                                                <h4>{product.title}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default Products