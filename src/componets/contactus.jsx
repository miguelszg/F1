import '../css/contactus.css';
import { useEffect, useRef, useState } from 'react';
import api from '../services/api';


// Deshabilitar la regla de ESLint para props validation
// eslint-disable-next-line react/prop-types
const Contactus = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const [isClosing, setIsClosing] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await api.post('/report', formData);
            alert('Reporte enviado correctamente');
            closeModal();
        } catch (error) {
            alert('Error al enviar el reporte');
        }
    };
    
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
                <form onSubmit={handleSubmit}>
    <div className="background1">
        <div className="form-group1">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group1">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group1">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" required value={formData.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit</button>
    </div>
</form>

            </div>
        </div>
    );
};

export default Contactus;