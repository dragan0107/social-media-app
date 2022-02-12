import React from 'react';
import './ChatFriend.css';

const ChatFriend = () => {
    return (
        <div>
            <li className="sidebar-friend">
                <img
                    src="https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg"
                    alt=""
                    className="sidebar-profile-pic"
                />
                <span className="friend-name">Drip Drip</span>
            </li>
        </div>
    );
};

export default ChatFriend;
