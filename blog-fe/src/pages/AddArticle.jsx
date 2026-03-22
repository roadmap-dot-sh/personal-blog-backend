import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {articleService, authService} from '../services/api';
import AdminHeader from '../components/AdminHeader';

function AddArticle() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        publishDate: new Date().toISOString().split('T')[0]
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        } else if (formData.title.length > 200) {
            newErrors.title = 'Title must be less than 200 characters';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        } else if (formData.content.length < 10) {
            newErrors.content = 'Content must be at least 10 characters';
        }

        if (!formData.publishDate) {
            newErrors.publishDate = 'Publishing date is required';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        try {
            await articleService.createArticle(formData);
            navigate('/admin');
        } catch (err) {
            console.error('Failed to create article:', err);
            setErrors({submit: 'Failed to create article: ' + err.message});
            setSubmitting(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    const wordCount = formData.content.trim().split(/\s+/).filter(word => word.length > 0).length;

    return (
        <>
            <AdminHeader onLogout={handleLogout}/>
            <div className="container">
                <div className="form-container">
                    <h2>Add New Article</h2>
                    {errors.submit && (
                        <div className="error-message" style={{color: 'red', marginBottom: '15px'}}>
                            {errors.submit}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Article Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={errors.title ? 'error-input' : ''}
                                placeholder="Enter article title"
                            />
                            {errors.title && <div className="error-message">{errors.title}</div>}
                        </div>

                        <div className="form-group">
                            <label>Publishing Date *</label>
                            <input
                                type="date"
                                name="publishingDate"
                                value={formData.publishDate}
                                onChange={handleChange}
                                className={errors.publishingDate ? 'error-input' : ''}
                            />
                            {errors.publishDate && <div className="error-message">{errors.publishDate}</div>}
                        </div>

                        <div className="form-group">
                            <label>Content *</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className={errors.content ? 'error-input' : ''}
                                placeholder="Write your article content here..."
                                rows="15"
                            />
                            {errors.content && <div className="error-message">{errors.content}</div>}
                            <div className="word-count">
                                Word count: {wordCount} {wordCount === 1 ? 'word' : 'words'}
                            </div>
                        </div>

                        <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                            <button type="submit" disabled={submitting}>
                                {submitting ? 'Publishing...' : 'Publish Article'}
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

export default AddArticle;