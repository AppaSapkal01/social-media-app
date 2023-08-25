import React, { useEffect } from "react";
import "./Posts.css";
// import { PostsData } from "../../Data/PostsData";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post";
import { getTimeLinePosts } from "../../actions/postAction";

const Posts = () => {
  const dispatch = useDispatch();
  // Access the authenticated user data from the Redux store
  const { user } = useSelector((state) => state.authReducer.authData);
  // Access posts and loading state from the Redux store
  const { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    // Fetch timeline posts for the authenticated user when the component mounts
    dispatch(getTimeLinePosts(user._id));
  });
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
