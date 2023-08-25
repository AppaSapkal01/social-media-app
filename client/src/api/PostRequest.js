import axios from "axios";

// Create an instance of Axios with a base URL for your server
const API = axios.create({ baseURL: "http://localhost:5000" })

// Function to fetch timeline posts for a specific user
export const getTimeLinePosts = (id) => API.get(`/post/${id}/timeline`)

// Function to like a specific post using its ID and user ID
export const likePost = (id, userId) => API.put(`post/${id}/like`, {userId: userId})