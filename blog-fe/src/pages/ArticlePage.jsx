import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {articleService} from '../services/api';
import Header from '../components/Header';
import {formatDate} from '../utils/dateUtils'; // Only import formatDate

function ArticlePage() {
    const {id} = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadArticle();
    }, [id]);

    const loadArticle = async () => {
        try {
            const response = await articleService.getArticleById(id);
            console.log('Article loaded:', response.data);
            setArticle(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to load article:', err);
            setError('Failed to load article');
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading article...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!article) return <div className="error">Article not found</div>;

    return (
        <>
            <Header/>
            <div className="container">
                <div className="article-detail">
                    <h1>{article.title}</h1>
                    <div className="date">
                        Published on {formatDate(article.publishDate, 'MMMM DD, YYYY')}
                        {article.wordCount && (
                            <span className="word-count"> • {article.wordCount} words</span>
                        )}
                    </div>
                    <div className="content">
                        {article.content ? (
                            article.content.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                        ) : (
                            <p>No content available</p>
                        )}
                    </div>
                    <Link to="/" className="back-link">← Back to Home</Link>
                </div>
            </div>
        </>
    );
}

export default ArticlePage;