import React from 'react';
import '../styles/BoardNavbar.css';

function BoardNavbar({ project }) {
    // 检查 project 是否为 undefined
    if (!project) {
        return <nav className="board-navbar"></nav>;
    }

    return (
        <nav className="board-navbar">
            <h2>{project.name}</h2>
        </nav>
    );
}

export default BoardNavbar;
