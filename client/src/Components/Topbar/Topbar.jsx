import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './Topbar.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
const Topbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [showTopMenu, setShowTopMenu] = useState(false);

    const handleClick = () => {
        localStorage.removeItem('jwt');
        dispatch({ type: 'LOGOUT' });
    };
    const friendReq = 3;
    const messages = 0;
    const notifications = 8;

    return (
        <header>
            <navbar className="topbar">
                <div className="left">
                    <h1 className="brand-name">Friendbook</h1>
                </div>
                <div className="center">
                    <input type="text" placeholder="Search" />
                    <Link to="/">
                        <a href="">Homepage</a>
                    </Link>

                    {/* <a href="">Timeline</a> */}
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
                                    notifications > 0
                                        ? 'white-notification'
                                        : ''
                                } `}
                            >
                                <i class="fas fa-bell"></i>
                                {notifications > 0 && (
                                    <span className="count">
                                        {notifications}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="topbar-menu">
                            <img
                                className="profile-pic"
                                src={
                                    user.profilePic ||
                                    'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                                }
                                alt=""
                                onClick={() =>
                                    setShowTopMenu((prevValue) => !prevValue)
                                }
                            />
                            {showTopMenu && (
                                <div className="menu-box">
                                    <ul className="option-list">
                                        <li>
                                            <AccountCircleIcon />
                                            <Link
                                                to={`/profile/${user.username}`}
                                            >
                                                <span>Profile</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Settings />
                                            <Link to={`/settings`}>
                                                <span>Settings</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </navbar>
        </header>
    );
};

export default Topbar;
