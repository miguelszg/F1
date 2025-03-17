import '../css/register.css';
import image from '../assets/register.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/');  
    }

    return (
        <div className='container'>
            <form className="form2">
                <span className="input-span">
                    <label htmlFor="name" className="label">Name</label>
                    <input type="name" name="name" id="name" />
                </span>
                <span className="input-span">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" name="email" id="email" />
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" name="password" id="password" />
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Confirm Password</label>
                    <input type="password" name="confirm_password" id="confirm_password" />
                </span>
                <span className="span"><a href=""></a></span>
                <input className="submit" type="submit" value="Register" />
                <span className="span-register">Do you have an account? <button type="button"  className='register_btn' onClick={handleLogin}>Login</button></span>
            </form>
            <img className='image2' src={image} alt="Register" />
        </div>
    );
};

export default Register;