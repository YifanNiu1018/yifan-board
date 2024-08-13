import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/Card.css';

function Card({ text, id, comments }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="card" onClick={handleCardClick}>
                {text}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                card={{ text, id, comments }}
            />
        </>
    );
}

export default Card;
