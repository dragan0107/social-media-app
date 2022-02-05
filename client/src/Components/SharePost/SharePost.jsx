import React, { useRef, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import './SharePost.css';

const SharePost = ({ setUpdated }) => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState();
    const [isPosting, setIsPosting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [status, setStatus] = useState('');

    const inputVal = document.getElementById('media-input');
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPosting(true);
        axios
            .post(
                'https://api.cloudinary.com/v1_1/dripcloud/image/upload',
                formData
            )
            .then((res) => {
                setErrorMsg('');
                const postData = {
                    userId: user._id,
                    desc: status,
                    image: res.data.secure_url,
                };
                statusUpload(postData);
                inputVal.value = '';
                setFormData();
                setStatus('');
            })
            .catch((err) => {
                if (
                    err.response.data.error.message ===
                    'Upload preset must be specified when using unsigned upload'
                ) {
                    if (status) {
                        statusUpload({
                            userId: user._id,
                            desc: status,
                        });
                        setStatus('');
                        setErrorMsg('');
                    } else {
                        setErrorMsg('Add image or enter status!');
                    }
                } else {
                    setErrorMsg('File size too large, maximum is 10MB');
                }
                setIsPosting(false);
            });
    };

    const statusUpload = (data) => {
        axios
            .post('/posts/create', data)
            .then((res) => {
                setUpdated(true);
                setUpdated(false);
                setIsPosting(false);
            })
            .catch((error) => {
                console.log(error);
                setIsPosting(false);
            });
    };
    const handleChange = async (e) => {
        const files = e.target.files;

        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'test_upload_react');

        setFormData(data);
    };

    return (
        <div className="share-post">
            <form className="share-wrapper" onSubmit={handleSubmit}>
                <div className="share-top">
                    <img
                        src={
                            user.profilePic ||
                            'https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg'
                        }
                        alt=""
                        className="user-pfp"
                    />
                    <textarea
                        name=""
                        id="status-textbox"
                        cols="50"
                        rows="2"
                        placeholder={`What's on your mind ${user.username}`}
                        maxLength="280"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        autoFocus
                    ></textarea>
                </div>
                <hr className="separator-line" />
                <div className="share-bottom">
                    <div className="add-media">
                        <label htmlFor="media-input">
                            <i className="media-icon fas fa-photo-video"></i>
                        </label>
                        <span className="media-span">Add a photo.</span>
                        <input
                            type="file"
                            name=""
                            id="media-input"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="share-btn"
                        type="submit"
                        disabled={isPosting ? true : false}
                    >
                        Share
                        {isPosting && (
                            <CircularProgress
                                color="inherit"
                                style={{ padding: '8px' }}
                            />
                        )}
                    </button>
                </div>
                <p className="error-notification">{errorMsg}</p>
            </form>
        </div>
    );
};

export default SharePost;
