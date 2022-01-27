import React, { useState, useEffect, useContext } from 'react';
import { reactionChecker } from '../../API_Actions/ApiCalls';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { AuthContext } from '../../Context/AuthContext';

const Post = ({ post, userData, profileChange, usernameURL, setUpdated }) => {
    const { user } = useContext(AuthContext);
    const [postAuthor, setPostAuthor] = useState({});
    const [likes, setLikes] = useState(post.likes.length);
    const [dislikes, setDislikes] = useState(post.dislikes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [showDel, setShowDel] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/?userId=${post.userId}`);
                setPostAuthor(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (!userData.username || profileChange === true) getUser();
    }, [profileChange]);

    const handleLike = async () => {
        try {
            if (!isLiked) {
                if (isDisliked) setDislikes((prevValue) => (prevValue -= 1));
                setIsLiked(true);
                setLikes((prevValue) => (prevValue += 1));
                setIsDisliked(false);
            } else {
                setIsLiked(false);
                setLikes((prevValue) => (prevValue -= 1));
            }
            await axios.put(`/posts/${post._id}/like`, {
                userId: user._id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDislike = async () => {
        try {
            if (!isDisliked) {
                if (isLiked) setLikes((prevValue) => (prevValue -= 1));
                setIsDisliked(true);
                setDislikes((prevValue) => (prevValue += 1));
                setIsLiked(false);
            } else {
                setIsDisliked(false);
                setDislikes((prevValue) => (prevValue -= 1));
            }
            await axios.put(`/posts/${post._id}/dislike`, {
                userId: user._id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        if (postAuthor.username === user.username) {
            try {
                await axios.delete(`/posts/delete/${post._id}`, {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('jwt'),
                    },
                });
                setUpdated(true);
                setUpdated(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        reactionChecker(user, post, setIsLiked, setIsDisliked);
    }, []);

    const openDel = () => {
        setShowDel((prevValue) => setShowDel(!prevValue));
    };
    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post-top">
                    <Link
                        to={`/profile/${
                            postAuthor.username || userData.username
                        }`}
                    >
                        {usernameURL === user.username ? (
                            <img
                                className="post-pfp"
                                src={
                                    user.profilePic ||
                                    'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                                }
                                alt=""
                            />
                        ) : (
                            <img
                                className="post-pfp"
                                src={
                                    userData.profilePic || postAuthor.profilePic
                                        ? userData.profilePic ||
                                          postAuthor.profilePic
                                        : 'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                                }
                                alt=""
                            />
                        )}
                    </Link>
                    <span className="post-author">
                        {userData.username || postAuthor.username}
                    </span>
                    <span className="post-created">
                        {format(post.createdAt)}
                    </span>
                    {postAuthor.username === user.username && (
                        <MoreVertIcon className="dots-icon" onClick={openDel} />
                    )}
                    {showDel && (
                        <div className="delete-box">
                            <div className="delete-wrapper">
                                <p className="delete-p" onClick={handleDelete}>
                                    Delete
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="post-mid">
                    <p className="post-desc">{post.desc}</p>
                    {post.image && (
                        <img className="post-image" src={post.image} alt="" />
                    )}
                </div>
                <div className="post-bottom">
                    <div className="reactions likes">
                        <ThumbUpIcon id="like-icon" onClick={handleLike} />
                        <span
                            className={
                                'likes-number ' + (isLiked ? 'liked' : '')
                            }
                        >
                            {likes}
                        </span>
                    </div>
                    <div className="reactions dislikes">
                        <ThumbDownIcon
                            id="dislike-icon"
                            onClick={handleDislike}
                        />

                        <span
                            className={
                                'dislikes-number ' +
                                (isDisliked ? 'disliked' : '')
                            }
                        >
                            {dislikes}
                        </span>
                    </div>
                    <span className="comments">5 comments</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
