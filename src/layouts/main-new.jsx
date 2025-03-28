import { useState, useEffect, useRef } from 'react';
import '../css/main-new.css';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const MainNew = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await api.get('/carousel'); 
                setSlides(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del carrusel:', error);
            }
        };

        fetchSlides();
        startTimer();

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 10000);
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        startTimer();
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
        startTimer();
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        startTimer();
    };

    const handleNew = (e, id) => {
        e.preventDefault();
        console.log('ID de la noticia:', id);
        navigate(`/articule/${id}`);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-content">
                <div 
                    className="carousel-slides" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div className="carousel-slide" key={index}>
                            <div className="carousel-text">
                                <h2>{slide.title}</h2>
                                <p>{slide.description}</p>
                                <button onClick={(e) => handleNew(e, slide._id)} className="read-more-btn">
                                    LEER MÁS
                                    <span className="arrow-icon">→</span>
                                </button>
                            </div>
                            <div className="carousel-image">
                                <img src={slide.imageUrl} alt={slide.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="carousel-nav prev" onClick={prevSlide}>‹</button>
            <button className="carousel-nav next" onClick={nextSlide}>›</button>
            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <span 
                        key={index} 
                        className={`indicator ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainNew;
