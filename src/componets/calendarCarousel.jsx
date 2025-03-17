import { useNavigate } from 'react-router-dom';
import '../css/calendarCarousel.css';
import image1 from '../assets/Pista1.jpg';
import image2 from '../assets/Pista2.jpg';

const CalendarCarousel = () => {
    const navigate = useNavigate();
    
    const newsItems = [
        {
            title: "NUEVA CIRCUITO EN TODO EL MUNDO",
            image: image1,
            link: "/news/campeonato-victoria"
        },
        {
        title: "LA CARRERA MAS ESPERADA",
            image: image2,
            link: "/news/296-challenge"
        }
    ];

    const handleNewsClick = (link) => {
        navigate(link);
    };

    return (
        <div className='news-carousel'>
            {newsItems.map((item, index) => (
                <div 
                    className='news-item' 
                    key={index}
                    onClick={() => handleNewsClick(item.link)}
                >
                    <div className='news-image-container'>
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className='news-image'
                        />
                        <div className='news-overlay'>
                            <h3 className='news-title'>{item.title}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalendarCarousel;