import React, { useEffect, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/conversations/Conversation";
import NavIcon from "../../components/navIcons/NavIcon";
import ChatBox from "../../components/chatBox/ChatBox";

const Chat = () => {
  // Get the user data from Redux state
  const { user } = useSelector((state) => state.authReducer.authData);

  // State to store the user's chats and the currently selected chat
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  // Fetch user's chats from the API when the component mounts or when the user changes
  useEffect(() => {

    const getChats = async () => {

      try {
        const { data } = await userChats(user._id); // gets the chats object of user
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);
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
                    <Conversation data={chat} currentUserId={user._id} />
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
          <ChatBox chat={currentChat} currentUser={user._id} />
        </div>
      </div>
    </>
  );
};

export default Chat;
