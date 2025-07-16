const initialState = {
    wishlist: [],
}

export const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            console.log("Adding item to wishlist: ", action.payload);
            const existingItem = state.wishlist.find((item) => item.id === action.payload.id);

            if (existingItem) {
                return {
                    ...state,
                    wishlist: state.wishlist.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: (item.quantity || 0) + 1 }
                            : item
                    )
                };
            }

            return {
                ...state,
                wishlist: [...state.wishlist, { ...action.payload, quantity: 1 }]
            };
        case "REMOVE_FROM_WISHLIST":
            console.log("Removing item from wishlist: ", action.payload);
            return {
                ...state,
                wishlist: state.wishlist.filter((item) => {
                    return item.id !== action.payload.id
                })
            }
        case "INCREASE_WISHLIST_QUANTITY":
            return {
                ...state,
                wishlist: state.wishlist.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        case "DECREASE_WISHLIST_QUANTITY":
            return {
                ...state,
                wishlist: state.wishlist.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            };
        case "CLEAR_WISHLIST":
            return {
                ...state,
                wishlist: []
            }
        default:
            return state
    }
}