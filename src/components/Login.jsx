import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');  // 用于存储密码错误信息
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setPasswordError('');
    };

    const handleUsernameChange = (e) => setUsername(e.target.value);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (isRegistering && confirmPassword && e.target.value !== confirmPassword) {
            setPasswordError('密码不一样！');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setPasswordError('密码不一样！');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegistering) {
            if (password !== confirmPassword) {
                setPasswordError('密码不一样！');
                return;
            }
            try {
                const response = await fetch('http://localhost:8080/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const result = await response.text();
                if (result === "0") {
                    setMessage('注册成功！');
                } else if (result === "1") {
                    setMessage('用户名已存在！');
                } else if (result === "2") {
                    setMessage('用户名或密码不符合要求！');
                }
            } catch (error) {
                console.error('注册时出错:', error);
                setMessage('注册时发生错误。');
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
                    navigate('/board', { state: { username } });
                } else {
                    setMessage('无效的用户名或密码');
                }
            } catch (error) {
                console.error('登录时出错:', error);
                setMessage('登录时发生错误。');
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
                        {passwordError && <p className="error-message">{passwordError}</p>}
                        <button type="submit" className="login-button" disabled={isRegistering && passwordError}>
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
