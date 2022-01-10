import React from 'react';
import OnlineFriend from '../OnlineFriend/OnlineFriend';
import ProfileFriend from '../ProfileFriend/ProfileFriend';
import './RightBar.css';

const RightBar = ({ profile }) => {
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
                        <OnlineFriend />
                        <OnlineFriend />
                        <OnlineFriend />
                        <OnlineFriend />
                        <OnlineFriend />
                    </ul>
                </div>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                <div className="profile-rightbar-wrapper">
                    <section className="rightbar-info">
                        <h4>User information</h4>
                        <div className="user-info-line"></div>
                        <div className="info-item">
                            <span className="info-first">Living in: </span>
                            <span className="user-city">New York</span>
                        </div>
                        <div className="info-item">
                            <span className="info-first">City:</span>
                            <span className="user-city">New York</span>
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
                        <ProfileFriend />
                        <ProfileFriend />
                        <ProfileFriend />
                        <ProfileFriend />
                        <ProfileFriend />
                        <ProfileFriend />
                        <ProfileFriend />
                        <ProfileFriend />
                        <ProfileFriend />
                        <ProfileFriend />
                        <ProfileFriend />
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
