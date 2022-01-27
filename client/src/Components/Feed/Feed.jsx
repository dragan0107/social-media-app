import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import SharePost from '../SharePost/SharePost';
import { getPosts, getUser } from '../../API_Actions/ApiCalls';
import './Feed.css';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress } from '@mui/material';

const Feed = ({ usernameURL, profile, profileChange }) => {
    const { user, dispatch } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [updated, setUpdated] = useState(false);
    const [postsFetching, setPostsFetching] = useState(false);

    useEffect(() => {
        getPosts(usernameURL, user, setPosts, dispatch, setPostsFetching);

        if (usernameURL) getUser(usernameURL, setUserData);
    }, [updated, usernameURL]);
    return (
        <div className="feed">
            <div className="feed-wrapper">
                {usernameURL === user.username && (
                    <SharePost setUpdated={setUpdated} />
                )}
                {!profile && <SharePost setUpdated={setUpdated} />}
                {postsFetching ? (
                    <CircularProgress className="spinner-feed" />
                ) : usernameURL ? (
                    posts.map((post) => (
                        <Post
                            key={post._id}
                            post={post}
                            userData={userData}
                            profileChange={profileChange}
                            usernameURL={usernameURL}
                            setUpdated={setUpdated}
                        />
                    ))
                ) : (
                    posts.map((post) => (
                        <Post
                            key={post._id}
                            post={post}
                            userData={userData}
                            profileChange={profileChange}
                            setUpdated={setUpdated}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;
