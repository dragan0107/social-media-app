import React from 'react';
import './Topbar.css';

const Topbar = () => {
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
                    <div className="notification friend">
                        <i class="fas fa-user-friends"></i>
                        <span className="count">3</span>
                    </div>
                    <div className="notification ">
                        <i class="fas fa-envelope"></i>
                        <span className="count">4</span>
                    </div>
                    <div className="notification ">
                        <i class="fas fa-bell"></i>
                        <span className="count">8</span>
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
