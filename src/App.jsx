import { useEffect, useState } from 'react';
import './App.css';
import Actions from './components/Actions/Actions';
import Food from './components/Food-Page/Food';
import Products from './components/Products/Products';
import "./components/styles/Base.css";
import "./components/styles/Responsive.css";
import { products } from './components/ProductsData';
import Header from './components/Header/Header';
import CartProvider from './components/context/cart/cartProvider';
import WishlistProvider from './components/context/wishlist/wishlistProvider';
import SortContext from './components/context/sort/SortContext';
import Pagination from './components/Pagination/Pagination';
import PaginationProvider from './components/context/pagination/PaginationProvider';
import { useTheme } from './components/context/theme/ThemeProvider';
// import { Route, Routes } from 'react-router-dom';
// import Login from './components/Login/Login';
import Search from './components/Search/Search';
import useDebounce from "./components/hooks/useDebounce";

function App() {

  const [productData, setProductData] = useState(products);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { isDark } = useTheme();

  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    fetch("https://food-web-db01-default-rtdb.firebaseio.com/products.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Firebase products:", data);
        const cleaned = Object.entries(data).map(([key, value]) => ({
          ...value,
          id: key,
        }));
        console.log("CLEANED", cleaned);
        setProductData(cleaned);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    if (debouncedSearchInput.trim() === "") {
      setSuggestions([]);
      return;
    }

    const matches = productData.filter(product =>
      product.title.toLowerCase().includes(debouncedSearchInput.toLowerCase())
    );

    setSuggestions(matches.slice(0, 5));
  }, [debouncedSearchInput, productData])

  const filteredProducts = productData.filter((item) => {
    return item.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <>
      <div className={isDark ? "app dark-mode" : "app light-mode"}>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <Search searchInput={searchInput} setSearchInput={setSearchInput} suggestions={suggestions} />
            <Food />
            <SortContext>
              <PaginationProvider totalItems={productData.length} itemsPerPage={12}>
                <Actions />
                <Products getProducts={productData} filterSearch={filteredProducts} />
                <Pagination />
              </PaginationProvider>
            </SortContext>
          </WishlistProvider>
        </CartProvider>
        {/* <Routes>
            <Route path='/login' element={<Login />} />
          </Routes> */}
      </div>
    </>
  )
}

export default App
