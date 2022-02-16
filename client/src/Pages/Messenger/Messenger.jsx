import React, { useContext, useEffect, useState } from 'react';
import ChatFriend from '../../Components/ChatFriend/ChatFriend';
import Message from '../../Components/Message/Message';
import Topbar from '../../Components/Topbar/Topbar';
import OnlineFriend from '../../Components/OnlineFriend/OnlineFriend';
import './Messenger.css';
import { AuthContext } from '../../Context/AuthContext';
import { getConversations } from '../../API_Actions/ApiCalls';
import axios from 'axios';

const Messenger = () => {
    const { user } = useContext(AuthContext);

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    console.log(currentChat);

    useEffect(() => {
        getConversations(setConversations, user._id);
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`/messages/${currentChat._id}`);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, [currentChat]);

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
                        {(messages.length > 0) ? (
                            messages.map((el) => (
                                <Message
                                    data={el}
                                    own={user._id === el.sender}
                                />
                            ))
                        ) : (
                            <div className="no-convo-box">
                                <h1 className="no-conv-info">
                                    Start a conversation with a friend.
                                </h1>
                            </div>
                        )}
                        {/* <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message own={true} />
                        <Message own={true} /> */}
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
                                placeholder="Message your friend..."
                            ></textarea>
                            <button className="msg-send-btn" type="submit">
                                Send
                            </button>
                        </form>
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
