import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import image from '../assets/register.png';
import api from '../services/api'; 

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');  

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await api.post('register', {
                nombre: name,
                correo: email,
                contraseña: password,
            });
            console.log(response.data);
            setMessage('Usuario registrado exitosamente! Redirigiendo...');  
            setTimeout(() => {
                navigate('/');  
            }, 2000);  
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrar');
        }
    };

    return (
        <div className='container'>
            <form className="form2" onSubmit={handleRegister}>
                <span className="input-span">
                    <label htmlFor="name" className="label">Name</label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </span>
                <span className="input-span">
                    <label htmlFor="email" className="label">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </span>
                <span className="input-span">
                    <label htmlFor="confirm_password" className="label">Confirm Password</label>
                    <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </span>
                {error && <div className="error">{error}</div>}
                {message && <div className="message">{message}</div>} {/* Mostrar el mensaje */}
                <input className="submit" type="submit" value="Register" />
                <span className="span-register">
                    Do you have an account? 
                    <button type="button" className='register_btn' onClick={() => navigate('/')}>
                        Login
                    </button>
                </span>
            </form>
            <img className='image2' src={image} alt="Register" />
        </div>
    );
};

export default Register;
