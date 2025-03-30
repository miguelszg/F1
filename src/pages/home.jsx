import { useEffect } from 'react'; 
import '../css/home.css';
import Navbar from '../layouts/navbar';
import MainNew from '../layouts/main-new';
import News from '../componets/news';
import { useLocation } from 'react-router-dom'; 
import Footbar from '../layouts/footbar';
import useAuthRedirect from '../layouts/useAuthRedirect';
import api from '../services/api';

const Home = () => {
    const location = useLocation(); 

    useAuthRedirect();


    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/stream');
    
        eventSource.onmessage = (event) => {
            console.log('Mensaje recibido:', JSON.parse(event.data));
        };
    
        eventSource.onerror = () => {
            console.log('Error en SSE');
            eventSource.close();
        };
    
        return () => eventSource.close();
    }, []);
    
    
    useEffect(() => {
        if (location.state?.scrollTo) {
            
            const section = document.getElementById(location.state.scrollTo);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (location.state?.scrollToTop) {
            
            const topElement = document.getElementById('top-section');
            if (topElement) {
                topElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.state]); 

    return (
        <div className="page-container" id="top-section"> 
            <Navbar />
            <div className="content-container">
                <MainNew />
                <News id="collections-section" />
            </div>
            <Footbar />
        </div>
    );
}

export default Home;