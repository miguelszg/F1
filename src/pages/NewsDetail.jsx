import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../css/newsDetail.css';
import Navbar from '../layouts/navbar';
import Footbar from '../layouts/footbar';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await api.get(`/news/${id}`);
                setNewsItem(response.data);
            } catch (error) {
                console.error('Error al obtener la noticia:', error);
            }
        };

        fetchNewsDetail();
    }, [id]);

    return (
        <div className="page-wrapper"> {/* Nuevo contenedor wrapper */}
            <Navbar />
            <div className="container-news">
                {newsItem ? (
                    <div className="content-news">
                        <div className="image-box">
                            <img src={newsItem.imageUrl} alt={newsItem.title} className="news-image" />
                        </div>
                        <div className="details-box">
                            <h1>{newsItem.title}</h1>
                            <p>{newsItem.detailedInfo}</p>
                        </div>
                    </div>
                ) : (
                    <p>Cargando noticia...</p>
                )}
            </div>
            <Footbar />
        </div>
    );
};

export default NewsDetail;