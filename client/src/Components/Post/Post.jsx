import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Post = ({ post }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/${post.userId}`);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, []);
    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post-top">
                    <img
                        className="post-pfp"
                        src={
                            user.profilePic
                                ? user.profilePic
                                : 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
                        }
                        alt=""
                    />
                    <span className="post-author">{user.username}</span>
                    <span className="post-created">5 min ago</span>
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
