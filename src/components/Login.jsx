import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-left">
                    <h2>Log In</h2>
                    <form>
                        <input type="text" placeholder="User Name" className="login-input" />
                        <input type="password" placeholder="User Password" className="login-input" />
                        <button type="submit" className="login-button">Log In</button>
                    </form>
                    <p className="register-link">
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                </div>
                <div className="login-right">
                    <img src="/mnt/data/image.png" alt="Login Illustration" className="login-image" />
                </div>
            </div>
            <footer className="login-footer">
                © 2021 Report Login Form. All rights reserved | Design by W3layouts
            </footer>
        </div>
    );
}

export default Login;
