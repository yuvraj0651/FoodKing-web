import React from 'react';
import ReactDOM from "react-dom";
import "./WishlistModal.css";

const WishlistModal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <div className='modal-overlay' onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                {children}
            </div>
        </div>,
        document.getElementById("wishlist-modal-root")
    )
}

export default WishlistModal

