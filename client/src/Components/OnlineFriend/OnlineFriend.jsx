import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const OnlineFriend = ({ onlineUsers, currentUserId, setCurrentChat }) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get(`users/friends/${currentUserId}`);
                setFriends(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFriends();
    }, [currentUserId]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [onlineUsers]);
    console.log(onlineFriends);

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
