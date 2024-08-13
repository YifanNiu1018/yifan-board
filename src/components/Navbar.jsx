import React from 'react';
import '../styles/Navbar.css';

function Navbar({ username, onCreate, onLogout, onSearch }) {
    const [isCreating, setIsCreating] = React.useState(false);
    const [newProjectName, setNewProjectName] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState(''); // 添加搜索框的状态

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleInputChange = (e) => {
        setNewProjectName(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchTerm);  // 调用传递的 onSearch 回调函数
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
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearchKeyPress}
                />
                <span className="username">{username}</span>
                <button className="logout-button" onClick={onLogout}>退出</button>
            </div>
        </div>
    );
}

export default Navbar;
