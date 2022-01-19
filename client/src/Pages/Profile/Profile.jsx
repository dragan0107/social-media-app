import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import Feed from '../../Components/Feed/Feed';
import RightBar from '../../Components/RightBar/RightBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const usernameURL = useParams().username; // this username is from profile url
    const [foundUser, setFoundUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/?username=${usernameURL}`);

                setFoundUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [usernameURL, foundUser]);
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
                                    foundUser.coverPic ||
                                    'https://a.cdn-hotels.com/gdcs/production103/d1782/cad3ba60-fe12-11e8-85c5-0242ac110002.jpg'
                                }
                                alt=""
                            />
                            <img
                                className="profile-user-img"
                                src={
                                    foundUser.profilePic ||
                                    'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                                }
                                alt=""
                            />
                        </div>
                        <div className="profile-info">
                            <h4 className="profile-user-name">
                                {foundUser.username}
                            </h4>
                            <span className="profile-desc">
                                {foundUser.desc || (
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
                        <RightBar
                            userInfo={foundUser}
                            usernameURL={usernameURL} //user from the profile url
                            profile={true}
                            loggedUser={user}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
