import React from 'react';
import './Profile.css';
import Feed from '../../Components/Feed/Feed';
import RightBar from '../../Components/RightBar/RightBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';

const Profile = () => {
    return (
        <div>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profile-right">
                    <div className="profile-right-top">
                        <div className="profile-cover">
                            <img
                                className="profile-cover-img"
                                src="https://a.cdn-hotels.com/gdcs/production103/d1782/cad3ba60-fe12-11e8-85c5-0242ac110002.jpg"
                                alt=""
                            />
                            <img
                                className="profile-user-img"
                                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                                alt=""
                            />
                        </div>
                        <div className="profile-info">
                            <h4 className="profile-user-name">Drip 016</h4>
                            <span className="profile-desc">
                                Welcome to my profile page, you can see more
                                information about me!
                            </span>
                        </div>
                    </div>
                    <div className="profile-right-bottom">
                        <Feed />
                        <RightBar profile={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
