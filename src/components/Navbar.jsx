import React, { useState } from 'react';
import '../styles/Navbar.css';

function Navbar({ onCreate }) {
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleInputChange = (e) => {
        setNewProjectName(e.target.value);
    };

    const handleCreateProject = () => {
        if (newProjectName.trim()) {
            onCreate(newProjectName.trim());
            setNewProjectName('');
            setIsCreating(false);
        }
    };

    const handleCancel = () => {
        setNewProjectName('');
        setIsCreating(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateProject();
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <h1>项目看板</h1>
                {isCreating ? (
                    <div className="create-project-form">
                        <input
                            type="text"
                            value={newProjectName}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="输入项目名称"
                            autoFocus
                        />
                        <button onClick={handleCreateProject}>创建</button>
                        <button onClick={handleCancel}>取消</button>
                    </div>
                ) : (
                    <button className="create-button" onClick={handleCreateClick}>
                        创建
                    </button>
                )}
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
                    />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
