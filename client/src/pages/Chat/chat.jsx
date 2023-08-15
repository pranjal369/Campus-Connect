import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './chat.css'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import { UilSetting } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import ChatBox from '../../components/ChatBox/ChatBox'


const Chat = () => {

    const { user } = useSelector((state) => state.authReducer.authData);
    console.log(user);
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id)
                setChats(data)
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getChats();
    }, [user])

    return (
        <div className="Chat">
            {/* Left side */}

            <div className="Left-side-chat">
                <LogoSearch />
                <h2>Chats</h2>

                <div className="Chat-container">

                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div onClick={()=> setCurrentChat(chat)} >
                                <Conversation data={chat} currentUserId={user._id} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Right side chat */}

            <div className="Right-side-chat">
                <div style={{ width: '20rem', alignSelf: 'flex-end' }} >
                    <div className="navIcons">
                        <Link to='../home' >
                            <img src={Home} alt="" />
                        </Link>
                        <UilSetting />
                        <img src={Noti} alt="" />
                        <Link to="../chat">
                            <img src={Comment} alt="" />

                        </Link>

                    </div>
                    {/* for chat body... */}
                    <ChatBox chat={currentChat} currentuser={user._id} />
                </div>

            </div>


        </div>
    )
}

export default Chat
