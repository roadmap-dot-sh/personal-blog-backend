import React from 'react';
import {Link} from 'react-router-dom';

function AdminHeader({onLogout}) {
    return (
        <div className="header">
            <div className="container">
                <h1>Personal Blog - Admin Panel</h1>
                <div className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/admin">Dashboard</Link>
                    <button onClick={onLogout} style={{marginLeft: '15px'}}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;