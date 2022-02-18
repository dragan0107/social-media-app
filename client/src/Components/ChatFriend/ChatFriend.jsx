import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './ChatFriend.css';
import axios from 'axios';

const ChatFriend = ({ friend, setConversationUsers }) => {
    const { user } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState([]);

    const chatFriendId = friend.members.filter((val) => val !== user._id)[0];

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/?userId=${chatFriendId}`);
                setUserInfo(res.data);
                setConversationUsers((prevValues) => {
                    return [...prevValues, res.data];
                });
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [user]);
    return (
        <>
            <img
                src={
                    userInfo.profilePic ||
                    'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                }
                alt=""
                className="chat-profile-pic"
            />
            <span className="chat-friend-name">
                {userInfo ? userInfo.username : ''}
            </span>
        </>
    );
};

export default ChatFriend;
