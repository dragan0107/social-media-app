import React, { useState } from 'react';

const OnlineFriend = ({ onlineUsers, curretnUserId, setCurrentChat }) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    return (
        <div>
            <li className="rightbar-friend">
                <div className="friend-image-wrapper">
                    <img
                        src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
                        alt=""
                        className="friend-pfp"
                    />
                    <span className="friend-online"></span>
                </div>
                <span className="friend-name">James Doe</span>
            </li>
        </div>
    );
};

export default OnlineFriend;
