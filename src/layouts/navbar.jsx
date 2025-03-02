import '../css/navbar.css';
import logo from '../assets/ferrarri.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const handleHome = (e) => {
        e.preventDefault();
        navigate('/home');  
    }

    return (
        <div className='container-nav'>
        <nav>
            <img className='logo-navbar' onClick={handleHome} src={logo} alt="Logo" />
            <div className="navbar-links">
            <li><a onClick={handleHome}>Home</a></li>
            </div>
        </nav>
        </div>
    );
};

export default Navbar;