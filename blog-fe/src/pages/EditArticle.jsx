import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {articleService, authService} from '../services/api';
import AdminHeader from '../components/AdminHeader';

function EditArticle() {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        publishDate: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadArticle();
    }, [id]);

    const loadArticle = async () => {
        try {
            const response = await articleService.getArticleById(id);

            // Ensure all fields are initialized with proper values
            setFormData({
                title: response.data.title || '',
                content: response.data.content || '',
                publishDate: response.data.publishDate || new Date().toISOString().split('T')[0]
            });
            setLoading(false);
        } catch (err) {
            console.error('Failed to load article:', err);
            setError('Failed to load article');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Validate form data
        if (!formData.title.trim()) {
            setError('Title is required');
            setSubmitting(false);
            return;
        }

        if (!formData.content.trim()) {
            setError('Content is required');
            setSubmitting(false);
            return;
        }

        try {
            await articleService.updateArticle(id, formData);
            navigate('/admin');
        } catch (err) {
            console.error('Failed to update article:', err);
            setError('Failed to update article: ' + err.message);
            setSubmitting(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    if (loading) return <div className="loading">Loading article...</div>;

    return (
        <>
            <AdminHeader onLogout={handleLogout}/>
            <div className="container">
                <div className="form-container">
                    <h2>Edit Article</h2>
                    {error && <div className="error-message" style={{color: 'red', marginBottom: '15px'}}>
                        {error}
                    </div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Article Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}  // Now always has a value
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Publishing Date</label>
                            <input
                                type="date"
                                name="publishingDate"
                                value={formData.publishDate}  // Now always has a value
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea
                                name="content"
                                value={formData.content}  // Now always has a value
                                onChange={handleChange}
                                required
                                rows="15"
                            />
                        </div>
                        <div className="word-count">
                            Word count: {formData.content.trim().split(/\s+/).filter(word => word.length > 0).length}
                        </div>
                        <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                            <button type="submit" disabled={submitting}>
                                {submitting ? 'Updating...' : 'Update Article'}
                            </button>
                            <button type="button" onClick={() => navigate('/admin')}
                                    style={{backgroundColor: '#95a5a6'}}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditArticle;