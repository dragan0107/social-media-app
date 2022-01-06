import React from 'react';
import Post from '../Post/Post';
import SharePost from '../SharePost/SharePost';
import './Feed.css';

const Feed = () => {
    return (
        <div className="feed">
            <div className="feed-wrapper">
                <SharePost />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
};

export default Feed;
