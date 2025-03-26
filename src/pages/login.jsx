import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import image from '../assets/login.jpg';
import Logo from '../assets/ferrarri.png';
import api from '../services/api';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mfaCode, setMfaCode] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [showMfaModal, setShowMfaModal] = useState(false); 

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('login', { correo: email, contraseña: password });

            if (response.data.qrCodeUrl) {
                setQrCodeUrl(response.data.qrCodeUrl); 
                setShowMfaModal(true); 
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error en el inicio de sesión');
        }
    };


    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/register');  
    }
    
    const handleMfaVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('verify-mfa', { correo: email, code: mfaCode });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error al verificar el código MFA');
        }
    };

    const closeMfaModal = () => {
        setShowMfaModal(false);
        setQrCodeUrl(''); 
    };

    return (
        <div className="container">
            <img className="image" src={image} alt="Login" />
            <form className="form" onSubmit={handleLogin}>
                <img className="logo" src={Logo} alt="Logo" />
                <span className="input-span">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </span>
                <input className="submit" type="submit" value="Log in" />
                <span className="span-login">Dont you have an account? <button type="button" className='register_btn' onClick={handleRegister}>Register</button></span>
                <button type="button" className="forgot-password-btn" onClick={() => navigate('/forgot-password')}>
    ¿Olvidaste tu contraseña?
</button>

                {showMfaModal && (
    <div className="mfa-modal">
        <button className="close-btn" onClick={closeMfaModal}>×</button>
        
        <div className="qr-section">
            <h3 className="qr-instructions">Escanea el código QR con tu aplicación de autenticación</h3>
            <img className="qr-code" src={qrCodeUrl} alt="QR Code" />
        </div>
        
        <div className="form-section">
            <h3 className="mfa-title">Verificación en dos pasos</h3>

            <div className="mfa-field">
                <label>Código MFA</label>
                <input 
                    type="text" 
                    value={mfaCode} 
                    onChange={(e) => setMfaCode(e.target.value)}
                    placeholder="Ingresa el código de 6 dígitos"
                />
            </div>
            
            <button className="mfa-verify-btn" onClick={handleMfaVerify}>
                Verificar Código
            </button>
        </div>
    </div>
)}
                {error && <span className="error">{error}</span>}
            </form>
        </div>
    );
};

export default Login;
