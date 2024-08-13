import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();  // 初始化 useNavigate

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
    };

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegistering) {
            try {
                const response = await fetch('http://localhost:8080/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const result = await response.text();  // 获取文本数据
                if (result === "0") {
                    setMessage('Registration successful!');
                } else if (result === "1") {
                    setMessage('Username already exists!');
                } else if (result === "2") {
                    setMessage('用户名或密码不符合要求！')
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setMessage('An error occurred during registration.');
            }
        } else {
            // 登录逻辑
            try {
                const response = await fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const result = await response.text();
                if (result === "0") {
                    navigate('/board', { state: { username } });  // 登录成功后导航到看板页面
                } else {
                    setMessage('Invalid username or password');
                }
            } catch (error) {
                console.error('Error during login:', error);
                setMessage('An error occurred during login.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-left">
                    <h2>{isRegistering ? '注册' : '登录'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="用户名"
                            className="login-input"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input
                            type="password"
                            placeholder="密码"
                            className="login-input"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {isRegistering && (
                            <input
                                type="password"
                                placeholder="确认密码"
                                className="login-input"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        )}
                        <button type="submit" className="login-button">
                            {isRegistering ? '注册' : '登录'}
                        </button>
                    </form>
                    <p className="register-link">
                        {isRegistering ? (
                            <>已经有账户了? <a href="#" onClick={toggleMode}>登录</a></>
                        ) : (
                            <>没有账户? <a href="#" onClick={toggleMode}>注册</a></>
                        )}
                    </p>
                    {message && <p>{message}</p>}
                </div>
                <div className="login-right">
                    <img src="src/assets/Login.png" alt="Login Illustration" className="login-image" />
                </div>
            </div>
        </div>
    );
}

export default Login;
