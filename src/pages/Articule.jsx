import '../css/article.css';
import Navbar from '../layouts/navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Footbar from '../layouts/footbar';

const Articule = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/articles/${id}`); 
                setArticle(response.data);
            } catch (error) {
                console.error('Error al obtener la noticia:', error);
            }
        };
        fetchArticle();
    }, [id]);

    return (
        <div className="page-container-article" id="top-section"> 
            <Navbar />
            {article ? (
                <>
                    <div className="article-container">
                        <img className="article-image" src={article.imageUrl} alt={article.title} />
                        <div className="scroll-indicator" onClick={() => document.getElementById('article-info').scrollIntoView({ behavior: 'smooth' })}>
                            <div className="scroll-text">
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                            </div>
                            <div className="arrow"></div>
                        </div>
                    </div>
                    <div id="article-info" className="article-info">
                        <h1>{article.title}</h1>
                        <p>{article.detailedInfo}</p>
                    </div>
                </>
            ) : (
                <p>Cargando noticia...</p>
            )}
            <Footbar />
        </div>
    );
}

export default Articule;
