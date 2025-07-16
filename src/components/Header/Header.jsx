import "./Header.css";
import { Container } from "react-bootstrap";
import HeaderLogo from "../../assets/Header/logo.svg";
import { FaBagShopping } from "react-icons/fa6";
import { useContext, useState } from "react";
import Cart from "../Cart/Cart";
import { CartContext } from "../context/cart/cartContext";
import Modal from "../Modal/Modal";
import { IoIosHeart } from "react-icons/io";
import { WishlistContext } from "../context/wishlist/wishlistContext";
import WishlistModal from "../Modal/WishlistModal";
import Wishlist from "../Wishlist-Page/Wishlist";
import { FaCloudMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { useTheme } from "../context/theme/ThemeProvider";
import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {

    const [showCart, setShowCart] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);

    const { cart } = useContext(CartContext)
    const { wishlist } = useContext(WishlistContext);

    const { isDark, toggleTheme } = useTheme();

    const handleCartOpen = () => {
        setShowCart(true);
    }

    const handleCartClose = () => {
        setShowCart(false);
    }

    const getTotalCartQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + item.newPrice * item.quantity;
        }, 0)
    }

    return (
        <>
            <header>
                <div className="header-section">
                    <Container fluid>
                        <div className="header-section__inner">
                            <div className="header-section__logo">
                                <img src={HeaderLogo} alt="header-logo" className='img-fluid header-logo' />
                            </div>
                            <div className="header-actions">
                                <div className="header-cart__action" onClick={handleCartOpen}>
                                    <FaBagShopping />
                                    <span className="action__text">Cart</span>
                                    <div className="header-cart__badge">
                                        <span>{getTotalCartQuantity()}</span>
                                    </div>
                                </div>
                                <div className="header-cart__action"
                                    onClick={() => setShowWishlist(true)}
                                >
                                    <IoIosHeart />
                                    <span className="action__text">Wishlist</span>
                                    <div className="header-cart__badge">
                                        <span>{wishlist.length}</span>
                                    </div>
                                </div>
                                {/* <div className="header-theme__toggler">
                                    <button type="button" onClick={toggleTheme}>
                                        {isDark ? <FaSun /> : <FaCloudMoon />}
                                        <span>{isDark ? "Light" : "Dark"}</span>
                                    </button>
                                </div> */}
                                <div className="header-auth__block">
                                    <Link to="/login">
                                        <FaUserTie />
                                        <span>Login</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>

            {
                showCart && (
                    <Modal onClose={handleCartClose}>
                        <Cart getProducts={cart} />
                        <div className="total-price__block">
                            <h4 className="total-price">Total: ${handleTotalPrice().toFixed(2)}</h4>
                        </div>
                    </Modal>
                )
            }
            {showWishlist && (
                <WishlistModal onClose={() => setShowWishlist(false)}>
                    <Wishlist onClose={() => setShowWishlist(false)} />
                </WishlistModal>
            )}
        </>
    )
}

export default Header