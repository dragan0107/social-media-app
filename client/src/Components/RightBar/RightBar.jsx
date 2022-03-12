import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import OnlineFriend from '../OnlineFriend/OnlineFriend';
import ProfileFriend from '../ProfileFriend/ProfileFriend';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CircularProgress from '@mui/material/CircularProgress';
import './RightBar.css';
import { AuthContext } from '../../Context/AuthContext';

const RightBar = ({ profile, userInfo, usernameURL, loggedUser }) => {
    const { user } = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(false);
    const [friends, setFriends] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            setIsFetching(true);
            try {
                const res = await axios.get(`/users/?username=${usernameURL}`);
                setFriends(res.data.followers);
                setIsFetching(false);
                if (res.data.followers.includes(user._id)) {
                    setIsFollowing(true);
                } else {
                    setIsFollowing(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [isFollowing, usernameURL]);

    const HomeRightbar = () => {
        return (
            <>
                <div className="rightbar-top">
                    <img className="gift-img" src="/assets/gift.png" />
                    <span className="birthday-info">
                        <b>John Doe</b> and <b>2 other friends</b> have a
                        birthday today.
                    </span>
                </div>
                <img
                    className="middle-img"
                    src="https://merriam-webster.com/assets/ld/word_of_the_day/images/3424/large.jpg"
                    alt=""
                />
                <hr className="rightbar-hr" />
                <div className="rightbar-bottom">
                    <span className="online-friends">Online friends</span>
                    <ul className="rightbar-friend-list">
                        <OnlineFriend />
                    </ul>
                </div>
            </>
        );
    };

    const ProfileRightbar = () => {
        const handleClick = () => {
            if (isFollowing) {
                axios.put(`/users/${userInfo._id}/unfollow`, {
                    userId: user._id,
                });
                setIsFollowing(false);
            } else {
                axios.put(`/users/${userInfo._id}/follow`, {
                    userId: user._id,
                });
                setIsFollowing(true);
            }
        };
        return (
            <>
                <div className="profile-rightbar-wrapper">
                    <section className="rightbar-info">
                        {usernameURL !== loggedUser.username && !isFollowing && (
                            <button
                                className="follow-btn"
                                onClick={handleClick}
                            >
                                Follow
                                <PersonAddAlt1Icon />
                            </button>
                        )}
                        {usernameURL !== loggedUser.username && isFollowing && (
                            <button
                                className="follow-btn"
                                onClick={handleClick}
                            >
                                Unfollow
                                <PersonRemoveIcon />
                            </button>
                        )}
                        <h4>
                            About{' '}
                            <span className="about-username">
                                {userInfo.username}
                            </span>
                        </h4>
                        <div className="user-info-line"></div>
                        <div className="info-item">
                            <span className="info-first">Living in: </span>
                            <span className="user-city">
                                {userInfo.city || <i>User did not specify.</i>}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-first">From:</span>
                            <span className="user-city">
                                {userInfo.from || <i>User did not specify.</i>}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-first">
                                Relationship status:
                            </span>
                            <span className="user-city">Single</span>
                        </div>
                    </section>
                    <h4 className="friends-tag">Friends</h4>
                    <div className="user-info-line"></div>
                    <section className="user-friends">
                        {isFetching ? (
                            <div className="spinner-box">
                                <CircularProgress className="spinner" />
                            </div>
                        ) : (
                            friends.map((el) => <ProfileFriend friendId={el} />)
                        )}
                    </section>
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="right-wrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
};

export default RightBar;
