import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div className="header">
            <div className="container">
                <h1>Personal Blog</h1>
                <div className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/admin">Admin</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;