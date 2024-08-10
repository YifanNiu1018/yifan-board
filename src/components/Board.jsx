import React, { useState } from 'react';
import BoardNavbar from './BoardNavbar';
import List from './List';
import '../styles/Board.css';

export default function Board() {
    const [lists, setLists] = useState([
        { id: 1, title: '待办事项' },
        { id: 2, title: '进行中' },
        { id: 3, title: '已完成' },
    ]);

    const addList = () => {
        const newList = { id: lists.length + 1, title: `新列表 ${lists.length + 1}` };
        setLists([...lists, newList]);
    };

    return (
        <div className="board">
            <BoardNavbar />
            <div className="board-content">
                {lists.map(list => (
                    <List key={list.id} title={list.title} />
                ))}
                <div className="add-list" onClick={addList}>
                    + 添加列表
                </div>
            </div>
        </div>
    );
}
