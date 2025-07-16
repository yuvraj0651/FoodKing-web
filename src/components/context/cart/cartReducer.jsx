export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_CART_ITEM":
            console.log("Adding item to cart:", action.payload);

            const existingItem = state.cart.find((item) => {
                return item.id === action.payload.id
            });

            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }
            }

            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }]
            }
        case "REMOVE_CART_ITEM":
            console.log("Removing item:", action.payload.id);

            return {
                ...state,
                cart: state.cart.filter((item) => {
                    return item.id !== action.payload.id;
                })
            }
        case "INCREASE_CART_QUANTITY":
            console.log("Increasing quantity:", action.payload.id);

            return {
                ...state,
                cart: state.cart.map((item) => {
                    return item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                })
            }
        case "DECREASE_CART_QUANTITY":
            console.log("Decreasing quantity:", action.payload.id);

            return {
                ...state,
                cart: state.cart
                    .map(item => {
                        if (item.id === action.payload.id) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    })
                    .filter(item => item.quantity > 0)
            };
        case "CLEAR_CART":
            console.log("Clearing cart");

            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}
