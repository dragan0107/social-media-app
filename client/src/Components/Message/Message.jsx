import React from 'react';
import './Message.css';

const Message = () => {
    return (
        <div className="message-wrapper">
            <div className="msg-top">
                <img
                    className="msg-img"
                    src="https://res.cloudinary.com/dripcloud/image/upload/v1642120967/test_upload_react/facebook-default-no-profile-pic1_wq7ysr.jpg"
                    alt=""
                />
                <p className="msg-text">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Deserunt corrupti laboriosam, harum veniam labore totam
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Deserunt corrupti laboriosam, harum veniam labore totam
                </p>
            </div>
            <div className="msg-bottom">
                <span className="msg-ago">5 min ago</span>
            </div>
        </div>
    );
};

export default Message;
