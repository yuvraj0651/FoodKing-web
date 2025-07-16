import "./Food.css";
import BreadcrumbImage from "../../assets/Banner/breadcrumb.jpg";
import { MdChevronRight } from "react-icons/md";

const Food = () => {
    return (
        <>
            <section>
                <div className="food-page__section">
                    <div className="food-page__section-breadcrumb">
                        <div className="breadcrumb-section__banner">
                            <div className="breadcrumb-section__content">
                                <h1 className="breadcrumb-headingText">Shop Page</h1>
                                <h4 className="breadcrumb-subtext">
                                    <span>home page</span>
                                    <MdChevronRight />
                                    <span>shop page</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Food