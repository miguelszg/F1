import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../css/calendarDetail.css';
import Navbar from '../layouts/navbar';
import Footbar from '../layouts/footbar';

const CalendarDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await api.get(`/calendar/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error al obtener el evento:', error);
            }
        };

        fetchEventDetail();
    }, [id]);

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="container-calendar">
                {event ? (
                    <div className="content-calendar">
                        <div className="image-container-calendar">
                            <img src={event.imageUrl} alt={event.title} className="image-calendar" />
                        </div>
                        <div className="details-calendar">
                            <h1>{event.title}</h1>
                            <p>{event.detailedInfo}</p>
                        </div>
                    </div>
                ) : (
                    <p>Cargando evento...</p>
                )}
            </div>
            <Footbar />
        </div>
    );
};

export default CalendarDetail;
