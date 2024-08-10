import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1>项目看板</h1>
                <button className="create-button">创建</button>
            </div>
            <div className="navbar-right">
                <input type="text" className="search-box" placeholder="搜索..." />
                <img src="user-avatar.jpg" alt="User Avatar" className="user-avatar" />
            </div>
        </nav>
    );
}

export default Navbar;
