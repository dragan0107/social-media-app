import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileFriend = ({ friendId }) => {
    const [friend, setFriend] = useState({});
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/?userId=${friendId}`);
                setFriend(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, []);
    return (
        <div className="single-friend">
            <Link to={`/profile/${friend.username}`}>
                <img
                    src={
                        friend.profilePic ||
                        'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                    }
                    alt=""
                    className="user-friend-img"
                />
            </Link>
            <span className="user-friend-name">{friend.username}</span>
        </div>
    );
};

export default ProfileFriend;
