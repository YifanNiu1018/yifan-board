import React from 'react';
import '../styles/BoardNavbar.css';

function BoardNavbar({ project }) {
    return (
        <nav className="board-navbar">
            <h2>{project.name} 的看板</h2>
            {/* 这里可以添加更多与项目相关的导航内容 */}
        </nav>
    );
}

export default BoardNavbar;
