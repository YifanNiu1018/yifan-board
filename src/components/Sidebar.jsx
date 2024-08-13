import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ projects, selectedProjectIndex, onSelect }) {
    return (
        <aside className="sidebar">
            <ul>
                {projects.map((project, index) => (
                    <li
                        key={project.id}
                        onClick={() => onSelect(index)}
                        className={selectedProjectIndex === index ? 'selected' : ''}
                    >
                        {project.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;
