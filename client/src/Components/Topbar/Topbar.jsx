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
            </div>
            <div className="right">
                <img
                    className="profile-pic"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Topbar;
