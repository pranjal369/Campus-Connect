<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest';


const ChatBox = ({ chat, currentUser }) => {
    const [userData, setUserData] = useState(null);

    // fetching data for header...
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                console.log(data);

            } catch (error) {
                console.log(error);
=======
import React, { useEffect, useRef, useState } from 'react'
import { addMessage, getMessages } from '../../api/MessageRequest';
import { getUser } from '../../api/UserRequest';
import './ChatBox.css'
import { format } from "timeago.js"
import InputEmoji from 'react-input-emoji'


const ChatBox = ({ chat, currentUser,setSendMessage,receiveMessage }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();


useEffect(()=>{
 if(receiveMessage!==null && receiveMessage.chatId===chat._id )
 {
    setMessages([...messages,receiveMessage])
 }
},[receiveMessage])


    // fetching data for header...
    useEffect(() => {
        if (chat) {
            const userId = chat.members.find((id) => id !== currentUser);
            if (userId) {
                const getUserData = async () => {
                    try {
                        const { data } = await getUser(userId);
                        setUserData(data);
                    } catch (error) {
                        console.log(error);
                    }
                };
                getUserData();
            }
        }
    }, [chat, currentUser]);

    // fetching data for messages...
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                console.log(data);
                setMessages(data);
            }
            catch (err) {
                console.log(err);
>>>>>>> f672f14a (added message functionality)
            }
        };

        if (chat !== null)
<<<<<<< HEAD
            getUserData();

    }, [chat, currentUser])
=======
            fetchMessages();
    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }
    const handleSend = async(e) => {
        e.preventDefault();
        const message = {

            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }

        //   send message to database...
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        }
        catch (err) {
            console.log(err);
        }

        // send message to socket server...

        const receiverId=chat.members.find((id)=>id!==currentUser);
        setSendMessage({...message,receiverId});
    
    }
// always scroll to last message
    useEffect(()=>{
        if(scroll.current)
        {
            scroll.current.scrollIntoView({behavior:"smooth"});

        }

    },[messages])
>>>>>>> f672f14a (added message functionality)

    return (
        <>
            <div className="ChatBox-container">
<<<<<<< HEAD
                <>
                    <div className="chat-header">
                        <div className="follower">
                            <div>
                                <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} alt=""
                                    className='followerImage'
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <div className="name" style={{ fontSize: "0.8rem" }} >

                                    <span>{userData?.firstname} {userData?.lastname} </span>

                                </div>

                            </div>
                        </div>
                    </div>
                </>
=======
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} alt=""
                                        className='followerImage'
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                    <div className="name" style={{ fontSize: "0.8rem" }} >

                                        <span>{userData?.firstname} {userData?.lastname} </span>
                                        {/* <span>Online fkk</span> */}
                                    </div>

                                </div>
                            </div>
                            <hr style={{ width: '85%', border: '0.3px solid #ececec' }} />

                        </div>
                        {/* Chatbox messages */}

                        <div className="chat-body">

                            {messages.map((message,index) => (
                                <>
                                    <div key={index} ref={index === messages.length - 1 ? scroll : null}  className={message.senderId === currentUser ? "message own" : "message"} >

                                        <span>
                                            {message.text}
                                        </span>
                                        <span>
                                            {format(message.createdAt)}
                                        </span>
                                    </div>
                                </>

                            ))}
                        </div>

                        {/* chat-sender */}
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}


                            />

                            <div className="send-button button" onClick={handleSend} >
                                Send
                            </div>

                        </div>
                    </>
                )
                    :
                    <span className='chatbox-empty-message' >
                        Tap On a Chat to Start Conversation

                    </span>
                }


>>>>>>> f672f14a (added message functionality)
            </div>
        </>
    )
}

export default ChatBox
