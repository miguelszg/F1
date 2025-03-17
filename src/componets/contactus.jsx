import '../css/contactus.css';
import { useEffect, useRef, useState } from 'react';

// Deshabilitar la regla de ESLint para props validation
// eslint-disable-next-line react/prop-types
const Contactus = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const closeModal = () => {
        setIsClosing(true); 
        setTimeout(() => {
            setIsClosing(false); 
            onClose(); 
        }, 300); 
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div className="modal-overlay1">
            <div className={`modal-content1 ${isClosing ? 'closing' : ''}`} ref={modalRef}>
                <div className="back-arrow1" onClick={closeModal}>←</div>
                <h1>Contact us</h1>
                <h2>Contacta con nosotros</h2>
                <form>
                    <div className="background1">
                    <div className="form-group1">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" required></textarea>
                    </div>
                    <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contactus;