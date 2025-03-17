
import PropTypes from 'prop-types'; 
import '../css/news.css';
import NewsCarousel from './NewsCarousel';
import CalendarCarousel from './calendarCarousel';

const News = ({ id }) => {
    return (
        <div id={id}>
            <div className='news-bar'>
                <h1 className='title'>News</h1>
            </div>
            <NewsCarousel />
            <div className='news-bar'>
                <h1 className='title'>Calendar</h1>
            </div>
            <CalendarCarousel />
        </div>
    );
};

News.propTypes = {
    id: PropTypes.string.isRequired, 
};

export default News;