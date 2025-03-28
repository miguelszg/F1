import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/newsCarousel.css';

const NewsCarousel = () => {
    const navigate = useNavigate();
    const [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.get('/news');
                setNewsItems(response.data);
            } catch (error) {
                console.error('Error al obtener las noticias:', error);
            }
        };

        fetchNews();
    }, []);

    const handleNewsClick = (link) => {
        navigate(link);
    };

    return (
        <div className='news-carousel'>
            {newsItems.map((item) => (
                <div 
                    className='news-item' 
                    key={item._id}
                    onClick={() => handleNewsClick(`/news/${item._id}`)}
                >
                    <div className='news-image-container'>
                        <img 
                            src={item.imageUrl} 
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

export default NewsCarousel;
