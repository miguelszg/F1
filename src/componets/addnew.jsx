import { useState } from 'react';
import '../css/addnew.css';
import api from '../services/api';

const AddNewsModal = ({ isOpen, onClose, onAddNews }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        detailedInfo: '',
    });
    const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito
    const [isLoading, setIsLoading] = useState(false); // Estado para la carga

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Activar estado de carga
        // Añadir el campo "link" con valor por defecto
        const dataToSend = {
            ...formData,
            link: '/articule', // Asignar el valor por defecto
        };

        try {
            const response = await api.post('/carousel', dataToSend); // Usar Axios con el método `post`
            console.log('Noticia agregada:', response.data);

            // Verificar si el mensaje en la respuesta es "Noticia agregada exitosamente"
            if (response.data.message === 'Noticia agregada exitosamente') {
                setSuccessMessage('Noticia agregada exitosamente'); // Mostrar mensaje de éxito
                onAddNews(); // Callback para refrescar los datos o realizar alguna acción adicional
                setTimeout(() => {
                    setSuccessMessage(''); // Limpiar mensaje después de 3 segundos
                    setIsLoading(false); // Desactivar estado de carga
                    onClose(); // Cerrar la modal
                }, 3000); // 3 segundos
            } else {
                throw new Error('Error al agregar la noticia');
            }
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false); // Desactivar estado de carga
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay1">
            <div className="modal-content1">
                <span className="back-arrow1" onClick={onClose}>&#8592;</span>
                <h1>Agregar Noticia</h1>
                <div className="modal-scroll"> {/* Contenedor con scroll */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group1">
                            <label>Título</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="form-group1">
                            <label>Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div className="form-group1">
                            <label>Imagen (URL)</label>
                            <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                        </div>
                        <div className="form-group1">
                            <label>Información Detallada</label>
                            <textarea name="detailedInfo" value={formData.detailedInfo} onChange={handleChange} required />
                        </div>
                        <button type="submit" disabled={isLoading}>Agregar</button>
                    </form>

                    {/* Mostrar mensaje de éxito si se agrega la noticia correctamente */}
                    {successMessage && (
                        <div className="success-message">
                            <p>{successMessage}</p>
                        </div>
                    )}

                    {isLoading && !successMessage && (
                        <div className="loading-message">
                            <p>Por favor espere...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddNewsModal;
