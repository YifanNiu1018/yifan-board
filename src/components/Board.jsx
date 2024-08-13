import React, { useState } from 'react';
import List from './List';
import '../styles/Board.css';

function Board({ project, updateLists, username }) {
    const [isAddingList, setIsAddingList] = useState(false);
    const [newListName, setNewListName] = useState('');

    // 确保 project 和 project.lists 存在
    if (!project || !project.lists) {
        return <div className="board-content"></div>;
    }

    const handleAddListClick = () => {
        setIsAddingList(true);
    };

    const handleInputChange = (e) => {
        setNewListName(e.target.value);
    };

    const handleAddList = () => {
        if (newListName.trim()) {
            const newList = {
                id: project.lists.length + 1,
                name: newListName.trim(),
                cards: [], // 初始化卡片数组
            };
            const updatedLists = [...project.lists, newList];

            // 调用后端API保存新List
            fetch(`http://localhost:8080/api/projects/${project.id}/lists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newList)
            })
                .then(response => response.json())
                .then(data => {
                    // 更新前端状态并重置输入框
                    updateLists(data.lists); // 使用后端返回的最新数据更新状态
                    setNewListName('');
                    setIsAddingList(false);
                })
                .catch(error => {
                    console.error("创建新列表时出错：", error);
                });
        }
    };

    const handleCancel = () => {
        setNewListName('');
        setIsAddingList(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddList();
        }
    };

    const updateListCards = (listId, updatedCards) => {
        const updatedLists = project.lists.map((list) =>
            list.id === listId ? { ...list, cards: updatedCards } : list
        );
        updateLists(updatedLists);
    };

    return (
        <div className="board-content">
            {project.lists.map((list) => (
                <List
                    key={list.id}
                    projectId={project.id}
                    list={list}
                    username={username}
                    updateCards={(updatedCards) => updateListCards(list.id, updatedCards)}
                />
            ))}
            {isAddingList ? (
                <div className="add-list-form">
                    <input
                        type="text"
                        value={newListName}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        autoFocus
                        placeholder="输入列表名称"
                    />
                    <div className="form-actions">
                        <button onClick={handleAddList}>创建</button>
                        <button onClick={handleCancel}>取消</button>
                    </div>
                </div>
            ) : (
                <div className="add-list" onClick={handleAddListClick}>
                    + 添加列表
                </div>
            )}
        </div>
    );
}

export default Board;
