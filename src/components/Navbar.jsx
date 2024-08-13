import React from 'react';
import '../styles/Navbar.css';

function Navbar({ username, onCreate, onLogout }) {
    const [isCreating, setIsCreating] = React.useState(false);
    const [newProjectName, setNewProjectName] = React.useState('');

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
                <span className="username">{username}</span>
                <button className="logout-button" onClick={onLogout}>退出</button>
            </div>
        </div>
    );
}

export default Navbar;
