import React from 'react';
import ChatFriend from '../../Components/ChatFriend/ChatFriend';
import Message from '../../Components/Message/Message';
import Topbar from '../../Components/Topbar/Topbar';
import './Messenger.css';

const Messenger = () => {
    return (
        <div className="container-messenger">
            <Topbar />
            <section className="messenger-wrapper">
                <div className="conversation-list">
                    <div className="conversations-box">
                        <span className="convo-title">Conversations</span>
                        <hr className="convo-hr" />
                        <ChatFriend />
                        <ChatFriend />
                        <ChatFriend />
                        <ChatFriend />
                        <ChatFriend />
                        <ChatFriend />
                        <ChatFriend />
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
                </div>
                <div className="message-box">
                    <div className="message-box-top">
                        <Message />
                    </div>
                    <div className="message-input-box">
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div className="online-friends-messenger">Online friends</div>
            </section>
        </div>
    );
};

export default Messenger;
