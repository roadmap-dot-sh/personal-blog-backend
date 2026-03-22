import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {articleService} from '../services/api';
import Header from '../components/Header';
import {formatDate} from '../utils/dateUtils'; // Only import formatDate

function HomePage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            const response = await articleService.getAllArticles();
            console.log('Articles loaded:', response.data);
            setArticles(response.data || []);
            setLoading(false);
        } catch (err) {
            console.error('Failed to load articles:', err);
            setError('Failed to load articles');
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading articles...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <Header/>
            <div className="container">
                <div className="articles-list">
                    {articles && articles.length > 0 ? (
                        articles.map((article) => (
                            <div key={article.id} className="article-card">
                                <h2 className="article-title">
                                    <Link to={`/article/${article.id}`}>{article.title}</Link>
                                </h2>
                                <div className="article-date">
                                    {formatDate(article.publishDate, 'MMM DD, YYYY')}
                                </div>
                                <div className="article-preview">
                                    {article.summary || (article.content ? article.content.substring(0, 200) : 'No content')}...
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-articles">
                            <p>No articles published yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default HomePage;