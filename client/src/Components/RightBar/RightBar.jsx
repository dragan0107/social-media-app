import React from 'react';
import OnlineFriend from '../OnlineFriend/OnlineFriend';
import ProfileFriend from '../ProfileFriend/ProfileFriend';
import './RightBar.css';

const RightBar = ({ profile, userInfo }) => {
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
        console.log(userInfo);
        return (
            <>
                <div className="profile-rightbar-wrapper">
                    <section className="rightbar-info">
                        <h4>User information</h4>
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
                        {userInfo.followers &&
                            userInfo.followers.map((el) => (
                                <ProfileFriend friendId={el} />
                            ))}
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
