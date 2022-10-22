import React from 'react';
import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../API_Actions/ApiCalls';
import { AuthContext } from '../../Context/AuthContext';
import './Login.css';

const Login = () => {
    const { user, isFetching, dispatch, error } = useContext(AuthContext);
    const username = useRef();
    const password = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        loginUser(username, password, dispatch);
    };

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
                    <form
                        action=""
                        className="right-wrapper-login"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="welcome-back">Welcome back!</h1>
                        <input
                            ref={username}
                            type="text"
                            placeholder="Username"
                        />
                        <input
                            ref={password}
                            type="password"
                            placeholder="Password"
                        />
                        {error && (
                            <h4 className="login-err">
                                Wrong credentials, please try again.
                            </h4>
                        )}
                        <button className="login-btn" type="submit">
                            Log In
                        </button>

                        <Link id="login-register" to="/register">
                            Create a new account
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

export default Login;
