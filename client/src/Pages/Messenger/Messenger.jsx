import React from 'react';
import ChatFriend from '../../Components/ChatFriend/ChatFriend';
import Topbar from '../../Components/Topbar/Topbar';
import './Messenger.css';

const Messenger = () => {
    return (
        <>
            <Topbar />
            <section className="messenger-wrapper">
                <div className="conversation-list">
                    Convo list
                    <ChatFriend />
                    <ChatFriend />
                    <ChatFriend />
                    <ChatFriend />
                    <ChatFriend />
                    <ChatFriend />
                    <ChatFriend />
                    <ChatFriend />
                    <ChatFriend />
                </div>
                <div className="message-box">Message box</div>
                <div className="online-friends-messenger">Online friends</div>
            </section>
        </>
    );
};

export default Messenger;
