import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/calendarCarousel.css';

const CalendarCarousel = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/calendar'); 
                const normalizedEvents = response.data.map(event => ({
                    ...event,
                    imageUrl: event.imageUrl // Usamos imageUrl directamente
                }));
                setEvents(normalizedEvents);
            } catch (error) {
                console.error('Error al obtener eventos:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (id) => {
        navigate(`/calendar/${id}`);
    };

    return (
        <div className='news-carousel'>
            {events.map((event) => (
                <div 
                    className='news-item' 
                    key={event._id}
                    onClick={() => handleEventClick(event._id)} 
                >
                    <div className='news-image-container'>
                        <img 
                            src={event.imageUrl}
                            alt={event.title} 
                            className='news-image'
                        />
                        <div className='news-overlay'>
                            <h3 className='news-title'>{event.title}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalendarCarousel;
