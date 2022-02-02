import React, { useRef, useState } from 'react';
import { useContext } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import './Settings.css';

const Settings = () => {
    const { user, dispatch } = useContext(AuthContext);
    const pass = useRef();
    const passConfirm = useRef();
    const [errorMsg, setErrorMsg] = useState('');

    const [formValues, setFormValues] = useState({
        userId: `${user._id}`,
        username: `${user.username}`,
        email: `${user.email}`,
        city: `${user.city}`,
        from: `${user.from}`,
        desc: `${user.desc}`,
        relationship: `${user.relationship}` || 1,
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setFormValues({
            ...formValues,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pass.current.value !== passConfirm.current.value) {
            setErrorMsg('Passwords do not match.');
        } else {
            if (pass.current.value) formValues.password = pass.current.value;
            try {
                const res = await axios.put(`/users/${user._id}`, formValues);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data.updatedUser,
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <Topbar />
            <div className="profile-settings">
                <Sidebar />
                <div className="settings-right">
                    <div className="settings-box">
                        <h1 className="update-header">Update your profile.</h1>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="pair top-pair">
                                <span>Username</span>
                                <input
                                    className="pair-input"
                                    type="text"
                                    defaultValue={user.username}
                                    name="username"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="pair">
                                <span>E-mail</span>
                                <input
                                    className="pair-input"
                                    type="email"
                                    name="email"
                                    defaultValue={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="pair">
                                <span>New Password</span>
                                <input
                                    className="pair-input"
                                    type="password"
                                    minLength={6}
                                    name="password"
                                    ref={pass}
                                />
                            </div>
                            <div className="pair">
                                <span>Password Confirm</span>
                                <input
                                    className="pair-input"
                                    type="password"
                                    minLength={6}
                                    ref={passConfirm}
                                />
                            </div>

                            <div className="pair">
                                <span>Living in</span>
                                <input
                                    className="pair-input"
                                    type="text"
                                    defaultValue={user.city}
                                    name="city"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="pair">
                                <span>Hometown</span>
                                <input
                                    className="pair-input"
                                    type="text"
                                    defaultValue={user.from}
                                    name="from"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="pair">
                                <span>Relationship status</span>
                                <input
                                    className="pair-input"
                                    type="text"
                                    name="relationship"
                                    defaultValue={user.relationship}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="pair">
                                <span>Description</span>
                                <textarea
                                    className="pair-input"
                                    type="text"
                                    rows={4}
                                    cols={23}
                                    name="desc"
                                    defaultValue={user.desc}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className="settings-btn" type="submit">
                                Submit Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
