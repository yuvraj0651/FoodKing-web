import { useEffect, useReducer } from 'react';
import { wishlistReducer } from './wishlistReducer';
import { WishlistContext } from "./wishlistContext";
import { useLocalStorage } from '../../hooks/useLocalStorage';

const WishlistProvider = ({ children }) => {

    const [storedWishlist, setStoredWishlist] = useLocalStorage("wishlist", []);

    const initialState = {
        wishlist: Array.isArray(storedWishlist) ? storedWishlist : []
    }

    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    useEffect(() => {
        setStoredWishlist(state.wishlist)
    }, [state.wishlist])

    return (
        <WishlistContext.Provider value={{ wishlist: state.wishlist, dispatch }}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistProvider