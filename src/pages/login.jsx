import '../css/login.css';
import image from '../assets/login.jpg';
import Logo from '../assets/ferrarri.png';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/register');  
    }
    
    return (
        <div className='container'>
            <img className='image' src={image} alt="Login" />
            <form className="form">
            <img className='logo' src={Logo} alt="Logo" />
                <span className="input-span">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" name="email" id="email" />
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" name="password" id="password" />
                </span>
                <span className="span"><a href=""></a></span>
                <input className="submit" type="submit" value="Log in" />
                <span className="span">Dont you have an account? <button type="button" className='register_btn' onClick={handleRegister}>Login</button></span>
            </form>
        </div>
    );
};

export default Login;