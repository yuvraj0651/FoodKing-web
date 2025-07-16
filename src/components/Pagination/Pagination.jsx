import "./Pagination.css";
import { usePagination } from '../context/pagination/PaginationProvider';

const Pagination = () => {

    const { currentPage, pageCount, setPage } = usePagination();
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <>
            <nav className='pagination'>
                <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>
                {
                    pages.map((num) => (
                        <button
                            key={num}
                            className={currentPage === num ? "active" : ""}
                            onClick={() => setPage(num)}
                        >
                            {num}
                        </button>
                    ))
                }
                <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === pageCount}>
                    Next
                </button>
            </nav>
        </>
    )
}

export default Pagination