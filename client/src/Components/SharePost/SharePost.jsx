import React from 'react';
import './SharePost.css';

const SharePost = () => {
    return (
        <div className="share-post">
            <div className="share-wrapper">
                <div className="share-top">
                    <img
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        alt=""
                        className="user-pfp"
                    />
                    <textarea
                        name=""
                        id="status-textbox"
                        cols="50"
                        rows="2"
                        placeholder="What's on your mind Drip?"
                        maxlength="280"
                        autoFocus
                    ></textarea>
                </div>
                <hr className="separator-line" />
                <div className="share-bottom">
                    <div className="add-media">
                        <label htmlFor="media-input">
                            <i className="media-icon fas fa-photo-video"></i>
                        </label>
                        <span className="media-span">Add Photo or Video</span>
                        <input type="file" name="" id="media-input" />
                    </div>
                    <button className="share-btn">Share</button>
                </div>
            </div>
        </div>
    );
};

export default SharePost;
