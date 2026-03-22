import axios from "axios";

const API_BASE_URL = 'http://localhost:4000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Add auth token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken")
        if (token) config.headers.Authorization = `Basic ${token}`

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor to handle API response format
api.interceptors.response.use(
    (response) => {
        // Extract data from ApiResponse wrapper
        if (response.data && response.data.success !== undefined) {
            return {
                ...response,
                data: response.data.data,
                message: response.data.message
            }
        }
        return response
    },

    (error) => {
        // Handle error responses
        if (error.response && error.response.data) {
            const errMessage = error.response.data.message || 'An error occurred'
            return Promise.reject(new Error(errMessage))
        }
        return Promise.reject(error)
    }
)

export const articleService = {
    // Public endpoints
    getAllArticles: () => api.get('/articles'),
    getArticlesPaginated: (page = 0,
                           size = 10,
                           sortBy = 'publishDate',
                           direction = 'desc'
    ) => api.get('/articles/paginated', {params: {page, size, sortBy, direction}}),
    getArticleById: (id) => api.get(`/articles/${id}`),

    // Admin endpoints
    createArticle: (article) => api.post('/admin/articles', article),
    updateArticle: (id, article) => api.put(`/admin/articles/${id}`, article),
    deleteArticle: (id) => api.delete(`/admin/articles/${id}`),
    searchArticles: (keyword) => api.get('/admin/search', {params: {keyword}}),
    getArticlesByDateRange: (startDate, endDate) =>
        api.get('/admin/date-range', {params: {startDate, endDate}}),
    getArticleStats: () => api.get('/admin/stats'),
}

export const authService = {
    login: (username, password) => {
        const token = btoa(`${username}:${password}`)
        localStorage.setItem('authToken', token)
        return Promise.resolve(true)
    },

    logout: () => {
        localStorage.removeItem('authToken')
    },

    isAuthenticated: () => {
        return localStorage.getItem('authToken') !== null
    }
}