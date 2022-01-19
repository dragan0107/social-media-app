import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import SharePost from '../SharePost/SharePost';
import { getPosts, getUser } from '../../API_Actions/ApiCalls';
import './Feed.css';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Feed = ({ usernameURL, profile }) => {
    const { user, dispatch } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        getPosts(usernameURL, user, setPosts, dispatch);
        if (usernameURL) getUser(usernameURL, setUserData);
    }, [updated, usernameURL]);
    return (
        <div className="feed">
            <div className="feed-wrapper">
                {usernameURL === user.username && (
                    <SharePost setUpdated={setUpdated} />
                )}
                {!profile && <SharePost setUpdated={setUpdated} />}
                {posts.map((post) => (
                    <Post key={post._id} post={post} userData={userData} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
