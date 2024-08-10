import React, { useState } from 'react';
import Card from './Card';
import '../styles/List.css';

function List({ list, updateCards }) {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardText, setNewCardText] = useState('');

    const handleAddCard = () => {
        if (newCardText.trim()) {
            const newCard = { id: list.cards.length + 1, text: newCardText.trim() };
            const updatedCards = [...list.cards, newCard];
            setNewCardText('');
            setIsAddingCard(false);
            updateCards(updatedCards);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddCard();
        }
    };

    return (
        <div className="list">
            <h3 className="list-title">{list.title}</h3>
            <div className="cards">
                {list.cards.map((card) => (
                    <Card key={card.id} text={card.text} />
                ))}
            </div>
            {isAddingCard ? (
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
            ) : (
                <button className="add-card-button" onClick={() => setIsAddingCard(true)}>
                    + 添加任务
                </button>
            )}
        </div>
    );
}

export default List;
