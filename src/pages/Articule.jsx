import '../css/article.css';
import Navbar from '../layouts/navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Footbar from '../layouts/footbar';

const Articule = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comments, setComments] = useState([]); // Estado para los comentarios
    const [newComment, setNewComment] = useState(''); // Estado para el comentario nuevo
    const [editCommentText, setEditCommentText] = useState(''); // Texto del comentario en edición

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/articles/${id}`);
                setArticle(response.data);
                setRating(response.data.rate || 3);
            } catch (error) {
                console.error('Error al obtener la noticia:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await api.get(`/articles/${id}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Error al obtener los comentarios:', error);
            }
        };

        fetchArticle();
        fetchComments();
    }, [id]);

    const handleRating = async (newRating) => {
        try {
            await api.put(`/articles/${id}/rate`, { rate: newRating });
            setRating(newRating);
        } catch (error) {
            console.error('Error al calificar:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('No se encontró el userId en el localStorage');
            return;
        }

        if (!newComment.trim()) {
            console.error('El comentario está vacío');
            return;
        }

        try {
            const response = await api.post(`/articles/${id}/comment`, {
                userId: userId,
                comment: newComment
            });

            setComments([...comments, {
                userName: localStorage.getItem('userName'),
                comment: newComment,
                createdAt: new Date().toISOString()
            }]);

            setNewComment('');
        } catch (error) {
            console.error('Error al enviar el comentario:', error);
        }
    };



   

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

                        <div className="rating-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
                                    onClick={() => handleRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <p className="rating-text">Valoración: {rating} / 5</p>

                        {/* Sección de comentarios */}
                        <div className="comments-section">
                            <h2>Comentarios</h2>
                            <ul className="comments-list">
                                {comments.length > 0 ? (
                                    comments.map((comment, index) => (
                                        <li key={index} className="comment">
                                            <strong>{comment.userName || 'Anónimo'}:</strong>
                                            {editCommentId === comment._id ? (
                                                <>
                                                    <textarea
                                                        value={editCommentText}
                                                        onChange={(e) => setEditCommentText(e.target.value)}
                                                    />
                                              
                                                </>
                                            ) : (
                                                <>
                                                    <span>{comment.comment}</span>
                                                </>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <p className="no-comments">Aún no hay comentarios. Sé el primero en opinar.</p>
                                )}
                            </ul>

                            <form className="comment-form" onSubmit={handleCommentSubmit}>
                                <textarea
                                    className="comment-input"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Escribe un comentario..."
                                ></textarea>
                                <button className="comment-button" type="submit">Enviar</button>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando noticia...</p>
            )}
            <Footbar />
        </div>
    );
};

export default Articule;
