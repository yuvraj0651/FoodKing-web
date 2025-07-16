import "./Actions.css";
import { Container } from "react-bootstrap";
import { IoFilterOutline } from "react-icons/io5";
import { GoSortDesc } from "react-icons/go";
import { MdOutlinePriceCheck } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/sort/SortContext";
import { useSort } from "../hooks/useSort";

const Actions = () => {

    const { productsState, setProducts } = useContext(ProductsContext);
    const [page, setPage] = useState(1);

    const { sortedItems, handleItemSort } = useSort(productsState)

    useEffect(() => {
        setProducts(prev =>
            JSON.stringify(prev) !== JSON.stringify(sortedItems)
                ? sortedItems
                : prev
        );
    }, [sortedItems, setProducts]);

    const handleDropdownChange = (e) => {
        const value = e.target.value;
        if (value === "priceLow") handleItemSort("price", "asc");
        else if (value === "priceHigh") handleItemSort("price", "desc");
        else if (value === "discount") handleItemSort("discount", "desc");
        else if (value === "alphaAZ") handleItemSort("title", "asc");
    };

    const showProductList = () => {
        const total = productsState.length;
        const perPage = 12;
        const start = (page - 1) * perPage + 1;
        const end = Math.min(page * perPage, total);
        return `${start}-${end} of ${total}`;
    }

    return (
        <>
            <section className='section-padding'>
                <div className="actions-section">
                    <Container fluid>
                        <div className="actions-section__inner">
                            <div className="actions-block">
                                <div className="actions-section__left">
                                    <div className="actions__filtering custom-actions">
                                        <IoFilterOutline className='action-icon' />
                                        <span className='custom-action-span'>Filtering </span>
                                    </div>
                                    <div className="actions__products custom-actions">
                                        <span className='custom-action-span'>showing <b>{showProductList()}</b> results </span>
                                    </div>
                                </div>
                                <div className="actions-section__right">
                                    <div className="actions__sort custom-actions">
                                        <span className='custom-action-span'>sort by</span>
                                        <GoSortDesc />
                                        <select onChange={handleDropdownChange}>
                                            <option value="priceLow">Price: Low to High</option>
                                            <option value="priceHigh">Price: High to Low</option>
                                            <option value="discount">Highest Discount</option>
                                            <option value="alphaAZ">Alphabetical: A-Z</option>
                                        </select>
                                    </div>
                                    <div className="actions__sort custom-actions">
                                        <span className='custom-action-span'>price</span>
                                        <MdOutlinePriceCheck />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default Actions