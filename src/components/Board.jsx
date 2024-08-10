import React from 'react';
import List from './List';
import '../styles/Board.css';

function Board({ project, updateLists }) {
    const addList = () => {
        const newList = {
            id: project.lists.length + 1,
            title: `${project.name} - 新列表 ${project.lists.length + 1}`,
            cards: [], // 初始化卡片数组
        };
        const updatedLists = [...project.lists, newList];
        updateLists(updatedLists);
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
            <div className="add-list" onClick={addList}>
                + 添加列表
            </div>
        </div>
    );
}

export default Board;
