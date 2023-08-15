import React, { useEffect } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest.js'
import { logOut } from '../../actions/AuthAction'


const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false);
    
    const dispatch=useDispatch()
    const params=useParams()

    const profileUserId=params.id;
    const [profileUser,setProfileUser]=useState({})


    const {user}=useSelector((state)=>state.authReducer.authData)

    useEffect(()=>{
        const fetchProfileUser=async()=>{
            if(profileUserId===user._id)
            {
                setProfileUser(user)
                // console.log(user);
            }
            else
            {
                const profileUser=await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
                // console.log(profileUser);
            }
        }
        fetchProfileUser();
    },[user])

    const handleLogOut=()=>{
        dispatch(logOut())
    }

    return (
        <div className="InfoCard">
            <div className="infoHead">
                <h4>Profile Info</h4>
                {user._id===profileUserId ? (
                     <div>
                     <UilPen width='2rem' height='1.3rem' onClick={() => setModalOpened(true)} />
                     <ProfileModal 
                     modalOpened={modalOpened} 
                     setModalOpened={setModalOpened}
                     data={user}
                     />
                 </div>
                ) : ("")}
               
            </div>
            <div className="info">
                <span>
                    <b>Bio</b>
                </span>
                <span>{profileUser.bio}</span>
            </div>
            <div className="info">
                <span>
                    <b>Status</b>
                </span>
                <span>{profileUser.relationship}</span>
            </div>
            <div className="info">
                <span>
                    <b>Lives in</b>
                </span>
                <span>{profileUser.livesin}</span>
            </div>
            <div className="info">
                <span>
                    <b>Works at</b>
                </span>
                <span>{profileUser.worksAt}</span>
            </div>
            <div className="info">
                <span>
                    <b>Years of Experience</b>
                </span>
                <span>{profileUser.exp}</span>
            </div>
            <div className="info">
                <span>
                    <b>Worked on Technology</b>
                </span>
                <span>{profileUser.worked}</span>
            </div>
            <div className="info">
                <span>
                    <b>Graduation Year</b>
                </span>
                <span>{profileUser.year}</span>
            </div>
            <div className="info">
                <span>
                    <b>Previous Company</b>
                </span>
                <span>{profileUser.prev_companies}</span>
            </div>

            <button className='button logout-button' onClick={handleLogOut}>Logout </button>
        </div>
    )
}

export default InfoCard
