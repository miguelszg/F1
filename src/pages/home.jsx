import { useEffect } from 'react'; 
import '../css/home.css';
import Navbar from '../layouts/navbar';
import MainNew from '../layouts/main-new';
import News from '../componets/news';
import { useLocation } from 'react-router-dom'; 
import Footbar from '../layouts/footbar';

const Home = () => {
    const location = useLocation(); 

    
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