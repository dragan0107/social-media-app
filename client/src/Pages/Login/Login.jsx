import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-left">
                    <h1 className="login-brand">Friendbook</h1>
                    <span className="login-about">
                        Connect with your friends from anywhere in the world on
                        our platform.
                    </span>
                </div>
                <div className="login-right">
                    <div className="right-wrapper">
                        <h1 className="welcome-back">Welcome back!</h1>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button className="login-btn">Log In</button>

                        <Link id="login-register" to="/register">
                            Create a new account
                        </Link>

                        <a className="forgot-pass" href="">
                            Forgot Your password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
