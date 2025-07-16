import { createContext, useState } from 'react';
import { products } from "../../ProductsData";

export const ProductsContext = createContext();

const SortContext = ({ children }) => {

    const [productsState, setProducts] = useState(products);

    return (
        <ProductsContext.Provider value={{ productsState, setProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default SortContext