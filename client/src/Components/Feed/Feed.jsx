import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import SharePost from '../SharePost/SharePost';
import './Feed.css';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Feed = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState({});

    const getUser = async () => {
        try {
            const res = await axios.get(`/users/?username=${username}`);
            // console.log(res);
            setUserData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = username
                    ? await axios.get(`/posts/user/${username}`)
                    : await axios.get(
                          `/posts/timeline/61ca57000999c98f21dfe70e`
                      );
                setPosts(res.data.allPosts);
            } catch (error) {
                console.log(error);
            }
        };

        getPosts();
        if (username) getUser();
    }, [username]);
    return (
        <div className="feed">
            <div className="feed-wrapper">
                <SharePost />
                {posts.map((post) => (
                    <Post key={post._id} post={post} userData={userData} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
