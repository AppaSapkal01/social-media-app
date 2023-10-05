import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";

const Conversation = ({ data, currentUserId }) => {
  // State to store user data of the conversation partner
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Find the user ID of the conversation partner
    const userId = data.members.find((id) => id !== currentUserId);

    // Function to fetch user data for the conversation partner
    const getUserData = async () => {
      try {
        // Fetch user data from the API based on the conversation partner's user ID
        const { data } = await getUser(userId); // gets the obj(info) of user with we're chatting

        // Update the state with the fetched user data
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          <div className="online-dot"></div>

          <img
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt=""
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />

          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>

            <span>online</span>
          </div>
        </div>
      </div>

      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
