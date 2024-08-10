import React, { useState } from 'react';
import Card from './Card';
import '../styles/List.css';

function List({ title }) {
    const [cards, setCards] = useState([]);
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardText, setNewCardText] = useState('');

    const handleAddCard = () => {
        if (newCardText.trim()) {
            setCards([...cards, newCardText.trim()]);
            setNewCardText('');
            setIsAddingCard(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddCard();
        }
    };

    const renderAddCardForm = () => {
        if (isAddingCard) {
            return (
                <div className="add-card-form">
                    <input
                        type="text"
                        value={newCardText}
                        onChange={(e) => setNewCardText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        autoFocus
                        placeholder="输入任务内容"
                    />
                    <div className="form-actions">
                        <button onClick={handleAddCard}>提交</button>
                        <button onClick={() => setIsAddingCard(false)}>取消</button>
                    </div>
                </div>
            );
        } else {
            return (
                <button className="add-card-button" onClick={() => setIsAddingCard(true)}>
                    + 添加任务
                </button>
            );
        }
    };

    return (
        <div className="list">
            <h3 className="list-title">{title}</h3>
            <div className="cards">
                {cards.map((card, index) => (
                    <Card key={index} text={card} />
                ))}
            </div>
            {renderAddCardForm()}
        </div>
    );
}

export default List;
