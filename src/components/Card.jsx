import React from 'react';
import '../styles/Card.css';

function Card({ text }) {
    return (
        <div className="card">
            {text}
        </div>
    );
}

export default Card;
