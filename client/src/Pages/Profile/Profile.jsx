import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import Feed from '../../Components/Feed/Feed';
import RightBar from '../../Components/RightBar/RightBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const usernameURL = useParams().username; // this username is from profile url
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/?username=${usernameURL}`);

                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [usernameURL]);
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
                                src={
                                    user.coverPic ||
                                    'https://a.cdn-hotels.com/gdcs/production103/d1782/cad3ba60-fe12-11e8-85c5-0242ac110002.jpg'
                                }
                                alt=""
                            />
                            <img
                                className="profile-user-img"
                                src={
                                    user.profilePic ||
                                    'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                                }
                                alt=""
                            />
                        </div>
                        <div className="profile-info">
                            <h4 className="profile-user-name">
                                {user.username}
                            </h4>
                            <span className="profile-desc">
                                {user.desc || (
                                    <i>
                                        User hasn't added any additional
                                        information yet...
                                    </i>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="profile-right-bottom">
                        <Feed usernameURL={usernameURL} profile={true} />
                        <RightBar userInfo={user} profile={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
