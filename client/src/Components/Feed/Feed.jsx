import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import SharePost from '../SharePost/SharePost';
import './Feed.css';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Feed = ({ usernameURL, profile }) => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [updated, setUpdated] = useState(false);

    const getUser = async () => {
        try {
            const res = await axios.get(`/users/?username=${usernameURL}`);
            // console.log(res);
            setUserData(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const getPosts = async () => {
            try {
                console.log(user);
                const res = usernameURL
                    ? await axios.get(`/posts/user/${usernameURL}`)
                    : await axios.get(`/posts/timeline/${user._id}`);
                console.log(res.data);
                setPosts(res.data.allPosts);
            } catch (error) {
                console.log(error);
            }
        };

        getPosts();
        if (usernameURL) getUser();
    }, [updated]);
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
