import Navbar from '../layouts/navbar';
import '../css/profile.css';
import profile from '../assets/profile.jpg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                navigate('/');
                return;
            }

            try {
                const response = await api.get(`user/${userId}`);
                setFormData({
                    name: response.data.nombre || '',
                    email: response.data.correo || '',
                    description: response.data.descripcion || ''
                });
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsModalOpen(true); 
    };

    const confirmSave = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/');
            return;
        }
    
        if (formData.name === '' || formData.description === '') {
            alert('Por favor, ingresa un nombre y una descripción');
            return;
        }
    
        try {
            const response = await api.put(`user/${userId}`, {
                nombre: formData.name,
                descripcion: formData.description
            });
    
            // Si no hay cambios, muestra un mensaje
            if (response.data.message === 'No se realizaron cambios') {
                alert('No se realizaron cambios');
                return;
            }
    
            alert(response.data.message);
            navigate('/home');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Hubo un error al actualizar el perfil');
        }
    
        setIsModalOpen(false); 
    };
    
    const cancelSave = () => {
        setIsModalOpen(false); 
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear(); 
        navigate('/'); 
    };
    
    return (
        <div className="page-container1">
            <Navbar />
            <div className="profile-content">
                <div className="profile-form-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="save-btn" onClick={handleSave}>Save</button>
                        </div>
                        <div className="logout-container">
                            <button type="button" className="logout-btn" onClick={handleLogout}>Log Out</button>
                        </div>
                    </form>
                </div>
                <div className="profile-image-container">
                    <img className='profile-image' src={profile} alt="Profile" />
                </div>
            </div>
            {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Confirmar cambios</h2>
                    <p>¿Estás seguro de que deseas guardar los cambios?</p>
                    <div className="modal-buttons">
                        <button className="cancel-btn" onClick={cancelSave}>Cancelar</button>
                        <button className="save-btn" onClick={confirmSave}>Confirmar</button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
};

export default Profile;