import React, { useState } from 'react';
import './Post.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';

import User from '../User/User'

const Post = ({ data }) => {
  // we have to always fetch the user, posts,id from the global authReducer variable...
  const { user } = useSelector((state) => state.authReducer.authData)
  // const { users } = useSelector((state) => state.postReducer)
  // let { posts,firstname } = useSelector((state) => state.postReducer)

  const [liked, setLiked] = useState(data.likes.includes(user._id))

  const [likes, setLikes] = useState(data.likes.length)

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
// Check if data exists and has the 'firstName' property
// const firstName = data && data.firstName ? data.firstName : '';

  return (
    <div className='Post'>
      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""  } alt="" />
      <div className="postReact">
        <img src={liked? Heart : NotLike} alt="" style={{cursor:"pointer"}} onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

       {/* { console.log(posts)} */}
    <span style={{color:"var(--gray)",fontSize:'15px'}}>{likes} Likes</span>
    <div className="detail">
        {/* <span><b>{{}}</b> </span> */}
        <span><b>{data.desc}</b> </span>
    </div>

    </div >


  );
}

export default Post;
