import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/UserRequest";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";

const ChatBox = ({ chat, currentUser, setSendMessage, recievedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();

  // Scroll to the last message whenever new messages are added
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  // Handle incoming messages from the socket server
  useEffect(() => {
    if (recievedMessage !== null && recievedMessage.chatId === chat._id) {
      setMessages([...messages, recievedMessage]);
    }
  }, [recievedMessage]);

  // Fetch data for the chat header, including the user's profile picture
  useEffect(() => {
    // Find the ID of the conversation partner in the chat
    const userId = chat?.members?.find((id) => id !== currentUser);

    // Function to get conversation partner's data
    const getUserData = async () => {
      try {
        // Fetch user data based on their ID
        const { data } = await getUser(userId);

        // Store the fetched user data in the state
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    // Only fetch user data if there is an active chat
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetching data for messages
  useEffect(() => {
    // Function to get chat messages for the current chat
    const fetchMessages = async () => {
      try {
        // Fetch messages based on the chat's unique identifier
        const { data } = await getMessages(chat._id);

        // Store the fetched messages in the state
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Only fetch messages if there is an active chat
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    // send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });

    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="ChatBox-container">
        {chat ? ( // Display chat header, messages, and input field if there's an active chat
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt=""
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>
            {/* chatbox messages */}
            <div className="chat-body">
              {messages.map((message) => {
                return (
                  <>
                    <div
                      ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message.text}</span>
                      <span>{format(message.createdAt)}</span>
                    </div>
                  </>
                );
              })}
            </div>

            {/* chat-sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          // Display a message when there's no active chat
          <span className="chatbox-empty-message">
            Tap on a Chat to start Conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
