import React from 'react'
import PostSide from '../../components/Postside/PostSide'
import ProfileSide from '../../components/profile/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'

const Home = () => {
    return (
       <div className="Home">
       <ProfileSide/>
       <PostSide/>
       <RightSide/>
        {/* <div className="postSide">Posts</div> */}
        {/* <div className="RightSide">RightSide</div> */}
       </div>

    )
}

export default Home
