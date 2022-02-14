import React from 'react';
import './ChatFriend.css';

const ChatFriend = () => {
    return (
        <div className="chat-friend">
            <img
                src="https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg"
                alt=""
                className="chat-profile-pic"
            />
            <span className="chat-friend-name">drip016</span>
        </div>
    );
};

export default ChatFriend;
