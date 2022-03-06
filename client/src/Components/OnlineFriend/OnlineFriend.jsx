import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';

const OnlineFriend = ({ onlineUsers, currentUserId, setCurrentChat }) => {
    const { user } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get(`users/friends/${currentUserId}`);
                setFriends(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFriends();
    }, [currentUserId]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [onlineUsers, friends]);

    const handleClick = async (friend) => {
        try {
            const res = await axios.get(
                `/conversations/${user._id}/${friend._id}`
            );
            setCurrentChat(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {/* We loop through online friends array and return a friend component for each online person */}
            {onlineFriends.map((f) => (
                <li className="rightbar-friend" onClick={() => handleClick(f)}>
                    <div className="friend-image-wrapper">
                        <img
                            src={
                                f.profilePic ||
                                'https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png'
                            }
                            alt=""
                            className="friend-pfp"
                        />
                        <span className="friend-online"></span>
                    </div>
                    <span className="friend-name">{f.username}</span>
                </li>
            ))}
        </div>
    );
};

export default OnlineFriend;
