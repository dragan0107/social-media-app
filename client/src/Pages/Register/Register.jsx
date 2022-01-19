import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../API_Actions/ApiCalls';
import { AuthContext } from '../../Context/AuthContext';
import './Register.css';

const Register = () => {
    const { dispatch } = useContext(AuthContext);

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.current.value !== passwordConfirm.current.value) {
            passwordConfirm.current.setCustomValidity(
                'Passwords do not match, try again!'
            );
        } else {
            registerUser(username, email, password, dispatch);
        }
    };

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
                    <form
                        className="right-wrapper-register"
                        action=""
                        onSubmit={handleSubmit}
                    >
                        <h1 className="join-fb">Join Friendbook!</h1>
                        <input
                            ref={username}
                            type="text"
                            placeholder="Username"
                        />
                        <input ref={email} type="email" placeholder="Email" />
                        <input
                            ref={password}
                            type="password"
                            placeholder="Password"
                            minLength={6}
                        />
                        <input
                            ref={passwordConfirm}
                            type="password"
                            placeholder="Password Confirm"
                            minLength={6}
                        />
                        <button className="register-btn" type="submit">
                            Sign Up
                        </button>
                        <Link id="login-existing" to="/login">
                            Login with existing account
                        </Link>
                        <a className="forgot-pass" href="">
                            Forgot Your password?
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
