import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatFriend from '../../Components/ChatFriend/ChatFriend';
import Message from '../../Components/Message/Message';
import Topbar from '../../Components/Topbar/Topbar';
import OnlineFriend from '../../Components/OnlineFriend/OnlineFriend';
import './Messenger.css';
import { AuthContext } from '../../Context/AuthContext';
import { getConversations, getMessages } from '../../API_Actions/ApiCalls';
import axios from 'axios';

const Messenger = () => {
    const { user } = useContext(AuthContext);

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    console.log(currentChat);

    useEffect(() => {
        getConversations(setConversations, user._id);
    }, [user]);

    useEffect(() => {
        getMessages(setMessages, currentChat?._id);
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleClick = async () => {
        if (newMessage) {
            try {
                const res = await axios.post('/messages/', {
                    conversationId: currentChat?._id,
                    sender: user._id,
                    text: newMessage,
                });
                setMessages((prevValues) => {
                    return [...prevValues, res.data.newMsg];
                });
                setNewMessage('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container-messenger">
            <Topbar />
            <section className="messenger-wrapper">
                <div className="conversation-list">
                    <div className="conversations-box">
                        <span className="convo-title">Conversations</span>
                        <hr className="convo-hr" />
                        {conversations.map((e) => (
                            <div
                                className="chat-friend"
                                onClick={() => setCurrentChat(e)}
                            >
                                <ChatFriend key={e._id} friend={e} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="message-box">
                    <div className="message-box-top">
                        {messages.length > 0 ? (
                            messages.map((el) => (
                                <div ref={scrollRef}>
                                    <Message
                                        data={el}
                                        own={user._id === el.sender}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="no-convo-box">
                                <h1 className="no-conv-info">
                                    Start a conversation with a friend.
                                </h1>
                            </div>
                        )}
                    </div>
                    <div className="message-input-box-wrapper">
                        <div className="msg-form">
                            <textarea
                                className="msg-input"
                                name=""
                                id=""
                                cols={60}
                                rows={6}
                                autoFocus
                                placeholder="Message your friend..."
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}
                            ></textarea>
                            <button
                                className="msg-send-btn"
                                onClick={handleClick}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                <div className="online-friends-messenger">
                    <span className="online-span">Online friends</span>
                    <hr className="convo-hr online-hr" />
                    <OnlineFriend />
                    <OnlineFriend />
                    <OnlineFriend />
                    <OnlineFriend />
                    <OnlineFriend />
                    <OnlineFriend />
                    <OnlineFriend />
                </div>
            </section>
        </div>
    );
};

export default Messenger;
