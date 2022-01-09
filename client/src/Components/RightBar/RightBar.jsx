import React from 'react';
import OnlineFriend from '../OnlineFriend/OnlineFriend';
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
                <h4>User information</h4>
                <section className="rightbar-info"></section>
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
