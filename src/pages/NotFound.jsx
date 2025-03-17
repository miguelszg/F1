import '../css/notfound.css';
import Navbar from '../layouts/navbar';
import carError from '../assets/car_404.png';
import Error404 from '../assets/404.png';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();
    const handleBack = (e) => {
        e.preventDefault();
        navigate('/home');  
    }
    return (
        <div className='background'>
            <Navbar />
            <div className="title"><h1>Ups, Parece que tomaste el camino equivocado</h1></div>
            <div className="notfound-container">
                <img className='error-404' src={Error404} alt="Error 404" />
                <img className='car-error' src={carError} alt="Car Error" />
            </div>
            <span className="span">Regresa al <button type="button" className='back_btn' onClick={handleBack}>Inicio</button> y encuentra el auto de tus sueños.</span>
        </div>
    );
};

export default NotFound;