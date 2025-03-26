import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/forgotpaswword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendCode = async () => {
        try {
            const response = await api.post('forgot-password', { correo: email });
            alert(response.data.message);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || 'Error enviando el código');
        }
    };

    const handleBackd = (e) => {
        e.preventDefault();
        navigate('/');  
    };

    const handleResetPassword = async () => {
        try {
            await api.post('reset-password', { correo: email, resetCode: code, nuevaContraseña: newPassword });
            alert('Contraseña actualizada correctamente');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al actualizar la contraseña');
        }
    };

    return (
        <div className="forgot-container">
            <h2>Recuperar contraseña</h2>
            {step === 1 ? (
                <div className="forgot-form">
                    <div className="input-wrapper">
                        <label className="forgot-label">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="forgot-btn" onClick={handleSendCode}>Enviar código</button>
                    <button className="forgot-btn" onClick={handleBackd}>Volver</button>
                </div>
            ) : (
                <div className="forgot-form">
                    <div className="input-wrapper">
                        <label className="forgot-label">Código de recuperación</label>
                        <input
                            type="text"
                            placeholder="Código"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="forgot-label">Nueva contraseña</label>
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button className="forgot-btn" onClick={handleResetPassword}>Actualizar contraseña</button>
                    <button className="forgot-btn" onClick={handleBackd}>Cancelar</button>
                </div>
            )}
            {error && <p className="forgot-error">{error}</p>}
        </div>
    );    
};

export default ForgotPassword;
