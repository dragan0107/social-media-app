import React from 'react';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Post = () => {
    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post-top">
                    <img
                        className="post-pfp"
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        alt=""
                    />
                    <span className="post-author">Drip Drip</span>
                    <span className="post-created">5 min ago</span>
                    <MoreVertIcon className="dots-icon" />
                </div>
                <div className="post-mid">
                    <p className="post-desc">
                        Hello, this is a nice place in Greece called Santorini
                        🏖🏖⛱
                    </p>
                    <img
                        className="post-image"
                        src="https://www.cntravellerme.com/2021/07/wVvzZ9HJ-andreas-m-santorini-unsplash-1200x819.jpg"
                        alt=""
                    />
                </div>
                <div className="post-bottom">
                    <div className="reactions likes">
                        <ThumbUpIcon id="like-icon" />
                        <span className="likes-number">5</span>
                    </div>
                    <div className="reactions dislikes">
                        <ThumbDownIcon id="dislike-icon" />
                        <span className="dislikes-number">3</span>
                    </div>
                    <span className="comments">5 comments</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
