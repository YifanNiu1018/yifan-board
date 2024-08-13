import React, { useState } from 'react';
import '../styles/Modal.css';

function Modal({ isOpen, onClose, card }) {
    const [comments, setComments] = useState(card.comments || []); // 初始评论列表
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => setNewComment(e.target.value);

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const updatedComments = [...comments, newComment.trim()];
            setComments(updatedComments);
            setNewComment('');
            saveCommentToBackend(updatedComments); // 可选：保存到后端
        }
    };

    const saveCommentToBackend = (updatedComments) => {
        console.log("Card ID:", card.id); // 添加调试信息
        fetch(`http://localhost:8080/api/projects/cards/${card.id}/comments`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedComments)
        })
            .then(response => response.json())
            .catch(error => {
                console.error("Error saving comments:", error);
            });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{card.text}</h2>
                    <button onClick={onClose}>关闭</button>
                </div>
                <div className="modal-body">
                    <div className="comments-section">
                        <h3>Comments</h3>
                        <div className="comments-list">
                            {comments.map((comment, index) => (
                                <p key={index}>{comment}</p>
                            ))}
                        </div>
                        <div className="comment-input">
                            <input
                                type="text"
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Add a comment"
                            />
                            <button onClick={handleCommentSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
