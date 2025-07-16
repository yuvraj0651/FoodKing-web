import { createContext, useContext, useState } from 'react';

const PaginationContext = createContext();

export const usePagination = () => useContext(PaginationContext);

const PaginationProvider = ({ children, totalItems, itemsPerPage = 12 }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const offset = (currentPage - 1) * itemsPerPage;
    const setPage = (page) => setCurrentPage(Math.max(1, Math.min(page , pageCount)));

    return (
        <PaginationContext.Provider value={{currentPage , itemsPerPage , pageCount , offset , setPage}}>
            {children}
        </PaginationContext.Provider>
    )
}

export default PaginationProvider