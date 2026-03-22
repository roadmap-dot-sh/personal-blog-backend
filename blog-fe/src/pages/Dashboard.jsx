import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {articleService, authService} from '../services/api';
import AdminHeader from '../components/AdminHeader';
import {formatDate} from '../utils/dateUtils';

function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [stats, setStats] = useState({totalArticles: 0, articlesThisMonth: 0});
    const navigate = useNavigate();

    useEffect(() => {
        loadArticles();
        loadStats();
    }, [page]);

    const loadArticles = async () => {
        try {
            const response = await articleService.getArticlesPaginated(page, 10);
            // Ensure we always have an array
            const content = response.data?.content || [];
            setArticles(content);
            setTotalPages(response.data?.totalPages || 0);
            setTotalElements(response.data?.totalElements || 0);
            setLoading(false);
        } catch (err) {
            console.error('Failed to load articles:', err);
            setArticles([]);
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const response = await articleService.getArticleStats();
            setStats(response.data || {totalArticles: 0, articlesThisMonth: 0});
        } catch (err) {
            console.error('Failed to load stats:', err);
            setStats({totalArticles: 0, articlesThisMonth: 0});
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await articleService.deleteArticle(id);
                // Reload current page
                loadArticles();
                loadStats();
            } catch (err) {
                console.error('Failed to delete article:', err);
                alert('Failed to delete article: ' + err.message);
            }
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    if (loading) return (
        <div className="loading" style={{textAlign: 'center', padding: '50px'}}>
            Loading articles...
        </div>
    );

    return (
        <>
            <AdminHeader onLogout={handleLogout}/>
            <div className="container">
                <div className="admin-header">
                    <div>
                        <h2>Manage Articles</h2>
                        <div className="stats">
                            <span>📊 Total Articles: {stats.totalArticles || 0}</span>
                            <span>📅 Articles This Month: {stats.articlesThisMonth || 0}</span>
                        </div>
                    </div>
                    <button className="add-button" onClick={() => navigate('/admin/add')}>
                        + Add New Article
                    </button>
                </div>

                <div className="articles-table">
                    {articles.length === 0 ? (
                        <div style={{textAlign: 'center', padding: '50px', background: 'white', borderRadius: '8px'}}>
                            <p>No articles found. Click "Add New Article" to create your first article!</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Word Count</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {articles.map((article) => (
                                <tr key={article.id}>
                                    <td style={{fontWeight: '500'}}>{article.title || 'Untitled'}</td>
                                    <td>
                                        {article.publishDate ?
                                            formatDate(article.publishDate, 'MMM DD, YYYY') :
                                            'No date'}
                                    </td>
                                    <td>{article.wordCount || 0} words</td>
                                    <td className="action-buttons">
                                        <button
                                            onClick={() => navigate(`/admin/edit/${article.id}`)}
                                            style={{backgroundColor: '#3498db'}}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="danger"
                                            onClick={() => handleDelete(article.id)}
                                            style={{backgroundColor: '#e74c3c'}}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0}
                        >
                            ← Previous
                        </button>
                        <span>Page {page + 1} of {totalPages}</span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                            disabled={page === totalPages - 1}
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Dashboard;