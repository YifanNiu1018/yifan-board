import React, { useState } from 'react';
import List from './List';
import '../styles/Board.css';

function Board({ project, updateLists }) {
    const [isAddingList, setIsAddingList] = useState(false);
    const [newListName, setNewListName] = useState('');

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
                title: newListName.trim(),
                cards: [], // 初始化卡片数组
            };
            const updatedLists = [...project.lists, newList];
            updateLists(updatedLists);
            setNewListName('');
            setIsAddingList(false);
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
                    list={list}
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
                        placeholder="输入列表名称"
                        autoFocus
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
