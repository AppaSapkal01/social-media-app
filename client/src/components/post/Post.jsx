import React, { useState } from "react";
import "./Post.css";
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";

const Post = ({ data }) => {
  // Access the authenticated user from Redux store
  const {user} = useSelector((state) => state.authReducer.authData)
  // Set initial liked state based on whether user liked the post
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);// Call the API to update the like status on the server
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  return (
    <>
      <div className="Post">
        {/* Display the post image */}
        <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />

        <div className="postsReact">
          <img src={liked ? Heart : NotLike} alt="" 
          style={{cursor: 'pointer'}}
          onClick={handleLike}/>
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>

        <span style={{color: 'var(--gray)', fontSize: '12px'}}>{likes} Likes</span>

        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
      </div>
    </>
  );
};

export default Post;
