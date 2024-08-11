import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-left">
                    <h2>{isRegistering ? 'Register' : 'Log In'}</h2>
                    <form>
                        <input type="text" placeholder="User Name" className="login-input" />
                        <input type="password" placeholder="User Password" className="login-input" />
                        {isRegistering && (
                            <input type="password" placeholder="Confirm Password" className="login-input" />
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
