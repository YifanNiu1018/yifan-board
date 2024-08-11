import React, { useState } from 'react';
import '../styles/Navbar.css';

function Navbar({ onCreate }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <h1>项目看板</h1>
                <button className="create-button" onClick={onCreate}>
                    创建
                </button>
            </div>
            <div className="navbar-right">
                <input
                    type="text"
                    className="search-box"
                    placeholder="搜索..."
                />
                <div className="avatar-container">
                    <img
                        src="https://via.placeholder.com/40"  // 替换为实际的用户头像链接
                        alt="User Avatar"
                        className="user-avatar"
                        onClick={toggleMenu}
                    />
                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item">更换头像</button>
                            <button className="dropdown-item">退出登录</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
