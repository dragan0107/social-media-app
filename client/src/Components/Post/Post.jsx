import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Post = ({ post, userData }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/?userId=${post.userId}`);
                // console.log(res);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (!userData.username) getUser();
    }, []);
    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post-top">
                    <Link to={`/profile/${user.username || userData.username}`}>
                        <img
                            className="post-pfp"
                            src={
                                userData.profilePic || user.profilePic
                                    ? userData.profilePic || user.profilePic
                                    : 'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                            }
                            alt=""
                        />
                    </Link>
                    <span className="post-author">
                        {userData.username || user.username}
                    </span>
                    <span className="post-created">
                        {format(post.createdAt)}
                    </span>
                    <MoreVertIcon className="dots-icon" />
                </div>
                <div className="post-mid">
                    <p className="post-desc">{post.desc}</p>
                    {post.image && (
                        <img className="post-image" src={post.image} alt="" />
                    )}
                </div>
                <div className="post-bottom">
                    <div className="reactions likes">
                        <ThumbUpIcon id="like-icon" />
                        <span className="likes-number">
                            {post.likes.length}
                        </span>
                    </div>
                    <div className="reactions dislikes">
                        <ThumbDownIcon id="dislike-icon" />
                        <span className="dislikes-number">
                            {post.dislikes.length}
                        </span>
                    </div>
                    <span className="comments">5 comments</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
