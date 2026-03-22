import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddArticle from './pages/AddArticle.jsx'
import EditArticle from './pages/EditArticle.jsx'
import Login from './pages/Login.jsx'
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/article/:id" element={<ArticlePage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/admin" element={
                        <PrivateRoute>
                            <Dashboard/>
                        </PrivateRoute>
                    }/>
                    <Route path="/admin/add" element={
                        <PrivateRoute>
                            <AddArticle/>
                        </PrivateRoute>
                    }/>
                    <Route path="/admin/edit/:id" element={
                        <PrivateRoute>
                            <EditArticle/>
                        </PrivateRoute>
                    }/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
