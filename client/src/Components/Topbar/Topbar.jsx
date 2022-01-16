import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './Topbar.css';

const Topbar = () => {
    const { user, dispatch } = useContext(AuthContext);

    const handleClick = () => {
        localStorage.removeItem('jwt');
        dispatch({ type: 'LOGOUT' });
    };
    const friendReq = 3;
    const messages = 0;
    const notifications = 8;

    return (
        <div className="topbar">
            <div className="left">
                <h1 className="brand-name">Friendbook</h1>
            </div>
            <div className="center">
                <input type="text" placeholder="Search" />
                <Link to="/">
                    <a href="">Homepage</a>
                </Link>

                <a href="">Timeline</a>
                <a className="logout-link" onClick={handleClick}>
                    Log Out
                </a>
            </div>
            <div className="right">
                <div className="info">
                    <div className="info-right">
                        <div
                            className={`notification ${
                                friendReq > 0 ? 'white-notification' : ''
                            } `}
                        >
                            <i class="fas fa-user-friends"></i>
                            {friendReq > 0 && (
                                <span className="count">{friendReq}</span>
                            )}
                        </div>
                        <div
                            className={`notification ${
                                messages > 0 ? 'white-notification' : ''
                            } `}
                        >
                            <i class="fas fa-envelope"></i>
                            {messages > 0 && (
                                <span className="count">{messages}</span>
                            )}
                        </div>
                        <div
                            className={`notification ${
                                notifications > 0 ? 'white-notification' : ''
                            } `}
                        >
                            <i class="fas fa-bell"></i>
                            {notifications > 0 && (
                                <span className="count">{notifications}</span>
                            )}
                        </div>
                    </div>
                    <Link to={`/profile/${user.username}`}>
                        <img
                            className="profile-pic"
                            src={
                                user.profilePic ||
                                'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                            }
                            alt=""
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
