import '../css/article.css';
import Navbar from '../layouts/navbar';
import campeonato from '../assets/Pista1.jpg';
import { useState } from 'react';

const Articule = () => {
    const [setShowInfo] = useState(false);

    const handleScroll = () => {
        const section = document.getElementById('article-info');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="page-container-article" id="top-section"> 
            <Navbar />
            <div className="article-container">
                <img className="article-image" src={campeonato} alt="Campeonato" />
                <div 
                    className="scroll-indicator" 
                    onMouseEnter={() => setShowInfo(true)} 
                    onMouseLeave={() => setShowInfo(false)} 
                    onClick={handleScroll}
                >
                    <div className="scroll-text">
                        <h2>LA PRUEBA MAS ESPERADA</h2>
                        <p>El 296 Challenge, sometido al examen de la prensa internacional en el circuito de Monteblanco</p>
                    </div>
                    <div className="arrow"></div>
                </div>
            </div>
            <div id="article-info" className="article-info">
                <h1>Formula 1: Campeonato Mundial</h1>
                <p>
                    La Fórmula 1 es la categoría más prestigiosa del automovilismo mundial. Con una historia que se remonta a 1950, 
                    la F1 ha sido testigo de algunas de las mayores hazañas en el mundo del deporte. Pilotos legendarios como 
                    Ayrton Senna, Michael Schumacher y Lewis Hamilton han dejado su huella en este deporte. Cada temporada, equipos 
                    como Mercedes, Ferrari y Red Bull compiten por el título de constructores, mientras que los pilotos luchan por 
                    el campeonato mundial. Los circuitos icónicos como Mónaco, Silverstone y Spa-Francorchamps son escenarios de 
                    emocionantes carreras que combinan velocidad, estrategia y tecnología de vanguardia.
                </p>
            </div>
        </div>
    );
}

export default Articule;