import React from 'react';
import '../styles/Board.css';
import BoardNavbar from './BoardNavbar';

function Board() {
    return (
        <div className="board">
            <BoardNavbar />
            <div className="board-content">
                <p>这里是看板的内容</p>
            </div>
        </div>
    );
}

export default Board;
