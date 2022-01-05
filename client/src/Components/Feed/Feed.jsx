import React from 'react';
import SharePost from '../SharePost/SharePost';
import './Feed.css';

const Feed = () => {
    return (
        <div className="feed">
            <div className="feed-wrapper">
                <SharePost />
            </div>
        </div>
    );
};

export default Feed;
