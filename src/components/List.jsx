import React, { useState } from 'react';
import Card from './Card';
import '../styles/List.css';

function List({ projectId, list, updateCards }) {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardText, setNewCardText] = useState('');

    const handleAddCard = () => {
        if (newCardText.trim()) {
            const newCard = { id: list.cards.length + 1, text: newCardText.trim() };
            const updatedCards = [...list.cards, newCard];
            setNewCardText('');
            setIsAddingCard(false);
            saveCardsToBackend(updatedCards); // 将更新后的卡片列表保存到后端
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddCard();
        }
    };

    const saveCardsToBackend = (updatedCards) => {
        fetch(`http://localhost:8080/api/projects/${projectId}/lists/${list.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCards)
        })
            .then(response => response.json())
            .then(data => {
                updateCards(data.lists.find(l => l.id === list.id).cards); // 更新前端状态
            })
            .catch(error => {
                console.error("更新任务列表时出错：", error);
            });
    };

    return (
        <div className="list">
            <h3 className="list-title">{list.name}</h3>
            <div className="cards">
                {list.cards.map((card) => (
                    <Card key={card.id} text={card.text} id={card.id} comments={card.comments} />
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
