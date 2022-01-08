import React from 'react';
import './Topbar.css';

const Topbar = () => {
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
                <a href="">Homepage</a>
                <a href="">Timeline</a>
            </div>
            <div className="right">
                <div className="info">
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
                    <img
                        className="profile-pic"
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default Topbar;
