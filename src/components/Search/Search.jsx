import "./Search.css";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Search = ({ searchInput, setSearchInput, suggestions }) => {

    return (
        <>
            <section>
                <div className="search-bar__section">
                        <div className="search-bar__inner-block">
                            <div className="search-bar__block">
                                <input
                                    type="search"
                                    name="search-bar"
                                    id="search"
                                    className='search__Input'
                                    value={searchInput}
                                    placeholder='Search Item Here...'
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <div className="search-bar__button-block">
                                    <button>
                                        <HiMagnifyingGlass className='glass-icon' />
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div>
                            <div className="autocomplete-dropdown">
                                {
                                    suggestions.map((item) => {
                                        return (
                                            <div
                                                key={item.id}
                                                className="autocomplete-suggestion"
                                                onClick={() => setSearchInput(item.title)}
                                            >
                                                <li>
                                                    {item.title}
                                                </li>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                </div>
            </section>
        </>
    )
}

export default Search