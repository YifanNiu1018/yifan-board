import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        setUsername('');          // 清空用户名输入框
        setPassword('');          // 清空密码输入框
        setConfirmPassword('');   // 清空确认密码输入框（如果有的话）
    };

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-left">
                    <h2>{isRegistering ? 'Register' : 'Log In'}</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="User Name"
                            className="login-input"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input
                            type="password"
                            placeholder="User Password"
                            className="login-input"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {isRegistering && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="login-input"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        )}
                        <button type="submit" className="login-button">
                            {isRegistering ? 'Register' : 'Log In'}
                        </button>
                    </form>
                    <p className="register-link">
                        {isRegistering ? (
                            <>Already have an account? <a href="#" onClick={toggleMode}>Log In</a></>
                        ) : (
                            <>Don't have an account? <a href="#" onClick={toggleMode}>Register</a></>
                        )}
                    </p>
                </div>
                <div className="login-right">
                    <img src="/mnt/data/image.png" alt="Login Illustration" className="login-image" />
                </div>
            </div>
        </div>
    );
}

export default Login;
