import React from 'react';
import './Register.css';

const Register = () => {
    return (
        <div className="register">
            <div className="register-wrapper">
                <div className="register-left">
                    <h1 className="register-brand">Friendbook</h1>
                    <span className="register-about">
                        Connect with your friends from anywhere in the world on
                        our platform.
                    </span>
                </div>
                <div className="register-right">
                    <div className="right-wrapper">
                        <h1 className="join-fb">Join Friendbook!</h1>
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Password Confirm" />
                        <button className="register-btn">Sign Up</button>
                        <button id="login-existing">
                            Login with existing account
                        </button>
                        <a className="forgot-pass" href="">
                            Forgot Your password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
