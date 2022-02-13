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
                        <Message />
                        <Message />
                        <Message />
                        <Message own={true} />
                        <Message own={true} />
                    </div>
                    <div className="message-input-box-wrapper">
                        <form className="msg-form" action="">
                            <textarea
                                className="msg-input"
                                name=""
                                id=""
                                cols={60}
                                rows={6}
                                autoFocus
                            ></textarea>
                            <button className="msg-send-btn" type="submit">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
                <div className="online-friends-messenger">Online friends</div>
            </section>
        </div>
    );
};

export default Messenger;
