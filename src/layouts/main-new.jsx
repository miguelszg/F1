import { useState, useEffect, useRef } from 'react';
import '../css/main-new.css';
import { useNavigate } from 'react-router-dom';
import nuevo from '../assets/new.jpg'
import campeonato from '../assets/champions.jpg'
import prueba from '../assets/Circuito_Monteblanco.jpg'

const MainNew = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const timerRef = useRef(null);
    
    const slides = [
        {
            title: "LA PRUEBA MAS ESPERADA",
            description: "El 296 Challenge, sometido al examen de la prensa internacional en el circuito de Monteblanco",
            image: prueba,
            link: "/articule"
        },
        {
            title: "NUEVO MODELO REVELADO",
            description: "Descubre las características del último modelo de nuestra marca",
            image: nuevo,
            link: "/articule"
        },
        {
            title: "GANADORES DEL CAMPEONATO",
            description: "Nuestro equipo logra una victoria histórica en el campeonato internacional",
            image: campeonato,
            link: "/articule"
        }
    ];

    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        
        timerRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 10000); 
    };

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

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

    const handleNew = (e, link) => {
        e.preventDefault();
        navigate(link);
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
                                <button onClick={(e) => handleNew(e, slide.link)} className="read-more-btn">
                                    LEER MÁS
                                    <span className="arrow-icon">→</span>
                                </button>
                            </div>
                            <div className="carousel-image">
                                <img src={slide.image} alt={slide.title} />
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