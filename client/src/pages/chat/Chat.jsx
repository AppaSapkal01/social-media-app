import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/conversations/Conversation";
import NavIcon from "../../components/navIcons/NavIcon";
import ChatBox from "../../components/chatBox/ChatBox";
import { io } from "socket.io-client";

const Chat = () => {
  // Get the user data from Redux state
  const { user } = useSelector((state) => state.authReducer.authData);

  // State to store the user's chats and the currently selected chat
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recievedMessage, setRecievedMessage] = useState(null);

  const socket = useRef();

  // sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    // Connect to the Socket.io server
    socket.current = io("http://localhost:8800");

    // Notify the server about the user's presence
    socket.current.emit("new-user-add", user._id);

    // Listen for updates on the list of online users
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      // Update the received message
      setRecievedMessage(data);
    });
  }, []);

  // Fetch user's chats from the API when the component mounts or when the user changes
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id); // gets the chats object of user

        // Update the state with the user's chat data
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Determine the online status of a chat based on its members
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="Chat">
        {/* Left Side */}
        <div className="Left-side-chat">
          <LogoSearch />

          <div className="Chat-container">
            <h2>Chats</h2>

            <div className="Chat-list">
              {/* Display the list of chat conversations */}
              {chats.map((chat) => {
                return (
                  <div onClick={() => setCurrentChat(chat)}>
                    {/* Render a conversation component for each chat */}
                    <Conversation
                      data={chat}
                      currentUserId={user._id}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <NavIcon />
          </div>
          {/* chat body */}
          {/* Render the chat box for the currently selected chat */}
          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            recievedMessage={recievedMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
