import React, { useState } from 'react';
import '../styles/Modal.css';

function Modal({ isOpen, onClose, card }) {
    const [comments, setComments] = useState(card.comments || []); // 初始评论列表
    const [newComment, setNewComment] = useState('');
    const [selectedFile, setSelectedFile] = useState(null); // 用于存储选中的文件
    const [uploadMessage, setUploadMessage] = useState(''); // 上传成功的提示信息

    const handleCommentChange = (e) => setNewComment(e.target.value);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadMessage(''); // 清除之前的上传成功提示
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const updatedComments = [...comments, newComment.trim()];
            setComments(updatedComments);
            setNewComment('');
            saveCommentToBackend(updatedComments); // 保存评论到后端
        }
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch(`http://localhost:8080/api/upload`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.filePath) {
                        setUploadMessage('File uploaded successfully!');
                        // 添加文件链接到评论列表
                        const fileComment = `File uploaded: ${data.filePath}`;
                        const updatedComments = [...comments, fileComment];
                        setComments(updatedComments);
                        saveCommentToBackend(updatedComments); // 更新后端的评论列表
                        setSelectedFile(null); // 清除选中文件
                    } else {
                        throw new Error('File path is missing in the response');
                    }
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    setUploadMessage('File upload failed.');
                });
        }
    };

    const saveCommentToBackend = (updatedComments) => {
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCommentSubmit();
        }
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
                                <p key={index}>
                                    {comment.startsWith('File uploaded:') ? (
                                        <a href={comment.split('File uploaded: ')[1]} target="_blank" rel="noopener noreferrer">
                                            {comment.split('File uploaded: ')[1].split('/').pop()}
                                        </a>
                                    ) : (
                                        comment
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="comment-input">
                        <input
                            type="text"
                            value={newComment}
                            onChange={handleCommentChange}
                            onKeyPress={handleKeyPress} // 处理按下Enter键
                            placeholder="Add a comment"
                        />
                        <button onClick={handleCommentSubmit}>Submit</button>
                    </div>
                    <div className="file-upload-section">
                        <h3>Upload Attachment</h3>
                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload">Choose File</label>
                        {selectedFile && (
                            <p className="file-name">Selected File: {selectedFile.name}</p>
                        )}
                        <button onClick={handleFileUpload}>Upload</button>
                        {uploadMessage && (
                            <p className="upload-message">{uploadMessage}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
