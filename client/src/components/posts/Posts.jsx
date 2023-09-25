import React, { useEffect } from "react";
import "./Posts.css";
// import { PostsData } from "../../Data/PostsData";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post";
import { getTimeLinePosts } from "../../actions/postAction";
import {useParams} from 'react-router-dom';

const Posts = () => {
  const dispatch = useDispatch();
  // Access the authenticated user data from the Redux store
  const { user } = useSelector((state) => state.authReducer.authData);
  // Access posts and loading state from the Redux store
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
  useEffect(() => {
    // Fetch timeline posts for the authenticated user when the component mounts
    dispatch(getTimeLinePosts(user._id));
  });
  if (!posts) return "no posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <>
      <div className="Posts">
        {loading
          ? "Fetching Posts..." // Display a loading message while posts are being fetched
          : posts.map((post, id) => {
              return <Post data={post} id={id} />; // Render the Post component for each post
            })}
      </div>
    </>
  );
};

export default Posts;
