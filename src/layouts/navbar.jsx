import '../css/navbar.css';
import logo from '../assets/ferrarri.png';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useState } from 'react';
import Contactus from '../componets/contactus';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleHome = (e) => {
        e.preventDefault();

        
        if (location.pathname !== '/home') {
            navigate('/home', { state: { scrollToTop: true } }); 
        } else {
            
            const topElement = document.getElementById('top-section');
            if (topElement) {
                topElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const scrollToSection = (e, sectionId) => {
        e.preventDefault(); 

        
        if (location.pathname !== '/home') {
            navigate('/home', { state: { scrollTo: sectionId } }); 
        } else {
            
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' }); 
            }
        }
    }

    return (
        <div className='container-nav'>
            <nav>   
                <div className="nav-content">
                    <img className='logo-navbar' onClick={handleHome} src={logo} alt="Logo" />
                    <ul className="navbar-links">
                        <li><a onClick={handleHome}>Racing</a></li>
                        <li><a href="#collections-section" onClick={(e) => scrollToSection(e, 'collections-section')}>Collections</a></li>
                        <li><a href="/sports">Sports cars</a></li>
                        <li><a href="/profile">Profile</a></li>
                        <div className="spacer"></div> 
                        <li><a className='contact-link' href="#" onClick={openModal}>Contact Us</a></li>
                    </ul>
                </div>  
            </nav>
            <Contactus isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Navbar;