import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/navbar.css';
import logo from '../assets/ferrarri.png';
import Contactus from '../componets/contactus';
import AddNewsModal from '../componets/addnew'; // Importamos la modal

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('role'); 
        setRole(storedRole);
    }, []); 
    
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
    };

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
    };

    return (
        <div className='container-nav'>
            <nav>   
                <div className="nav-content">
                    <img className='logo-navbar' onClick={handleHome} src={logo} alt="Logo" />
                    <ul className="navbar-links">
                        <li><a onClick={handleHome}>Racing</a></li>
                        <li><a href="#collections-section" onClick={(e) => scrollToSection(e, 'collections-section')}>Collections</a></li>
                        <li><a onClick={(e) => { e.preventDefault(); navigate('/profile'); }}>Profile</a></li>
                        <div className="spacer"></div> 

                        {role === '1' && (
                            <li>
                                <a href="#" className="add-new-btn" onClick={(e) => { e.preventDefault(); setIsNewsModalOpen(true); }}>Add New</a>
                            </li>
                        )}

                        <li><a className='contact-link' href="#" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }}>Contact Us</a></li>
                    </ul>
                </div>  
            </nav>

            <Contactus isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            <AddNewsModal isOpen={isNewsModalOpen} onClose={() => setIsNewsModalOpen(false)} onAddNews={() => console.log('Noticia agregada')} />
        </div>
    );
};

export default Navbar;
