import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatFriend from '../../Components/ChatFriend/ChatFriend';
import Message from '../../Components/Message/Message';
import Topbar from '../../Components/Topbar/Topbar';
import OnlineFriend from '../../Components/OnlineFriend/OnlineFriend';
import './Messenger.css';
import { AuthContext } from '../../Context/AuthContext';
import { getConversations, getMessages } from '../../API_Actions/ApiCalls';
import axios from 'axios';
import { debounce } from 'lodash';
import { io } from 'socket.io-client';
import { throttle } from '../../utils/utils';

const Messenger = () => {
    const { user } = useContext(AuthContext);

    const socket = useRef();
    const [conversations, setConversations] = useState([]);
    const [conversationUsers, setConversationUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const newMessage = useRef(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    let isTyping = false;
    useEffect(() => {
        socket.current = io('ws://localhost:1717'); // Connects to socket server.
        socket.current.emit('addUser', user._id); // Emits our logged in user id to the socket server.

        // We loop through logged in user followings and check if any of the online users matches the current user friends.
        socket.current.on('usersConnected', (users) => {
            setOnlineUsers(
                user.following.filter((f) => users.some((u) => u.userId === f))
            );
        });
        // Listens to new messages and updates the arrival message state.
        socket.current.on('getMessage', (incMessage) => {
            setArrivalMessage({
                sender: incMessage.senderId,
                text: incMessage.text,
                createdAt: Date.now(),
            });
        });
    }, [user]);

    /*We check if there's new message from the socket server, and if the current chat
     partner is same as new message sender, it pushes it to current conversation. */
    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prevValues) => {
                return [...prevValues, arrivalMessage];
            });
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        getConversations(setConversations, user._id);
    }, [user]);

    // Gets messages from current conversation.
    useEffect(() => {
        getMessages(setMessages, currentChat?._id);
    }, [currentChat]);

    // Smooth scrolling to the last message in current conversation.
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleClick = async () => {
        if (newMessage.current.value) {
            try {
                const receiverId = currentChat.members.find(
                    (member) => member !== user._id
                );

                // Emitting new message event to the server, send it to messages collection and display it in our current conversation.
                socket.current.emit('sendMessage', {
                    senderId: user._id,
                    receiverId,
                    text: newMessage.current.value,
                });
                const res = await axios.post('/messages/', {
                    conversationId: currentChat?._id,
                    sender: user._id,
                    text: newMessage.current.value,
                });
                setMessages((prevValues) => {
                    return [...prevValues, res.data.newMsg];
                });
                newMessage.current.value = '';
            } catch (error) {
                console.log(error);
            }
        }
    };

    const changeToFalse = () => {
        isTyping = false;
        socket.current.emit('userTyping', {
            userTyping: false,
        });
    };
    const handleTyping = debounce(changeToFalse, 1500);

    const emitTyping = throttle(() => {
        socket.current.emit('userTyping', {
            userTyping: true,
        });
    });

    return (
        <div className="container-messenger">
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
                                <ChatFriend
                                    key={e._id}
                                    friend={e}
                                    setConversationUsers={setConversationUsers}
                                />
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
                                        conversationUsers={conversationUsers}
                                        msgSender={el.sender}
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
                                onChange={(e) => {
                                    isTyping = true;
                                    emitTyping();
                                    handleTyping();
                                }}
                                ref={newMessage}
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
                    <OnlineFriend
                        onlineUsers={onlineUsers}
                        currentUserId={user._id}
                        setCurrentChat={setCurrentChat}
                    />
                </div>
            </section>
        </div>
    );
};

export default Messenger;
