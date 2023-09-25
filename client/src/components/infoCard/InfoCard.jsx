import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../profileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest.js";
import { logOut } from "../../actions/AuthAction";

const InfoCard = () => {
  // State to manage the modal visibility
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  // Extracting the profile user's ID from the route params
  const profileUserId = params.id;

  // State to store the profile user's data
  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        // If the profile being viewed is the logged-in user's own profile, use the user data
        setProfileUser(user);
      } else {
        // If it's a different profile, fetch the user data using API request
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
        // Call the fetchProfileUser function when the component mounts or when user or profileUserId changes
    fetchProfileUser();
  }, [user, profileUserId]);

  const handleLogOut = () => {
    dispatch(logOut())
  }
  return (
    <>
      <div className="InfoCard">
        <div className="infoHead">
          <h4>Profile Info</h4>
          {user._id === profileUserId ? (
            // Display edit button and profile modal only for the logged-in user's own profile
            <div>
              <UilPen
                width="2rem"
                height="1.2rem"
                onClick={() => setModalOpened(true)}
              />
              <ProfileModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                data = {user} // Pass user data to the profile modal
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="info">
          <span>
            <b>Status </b>
          </span>
          <span>{profileUser.relationship}</span>
        </div>

        <div className="info">
          <span>
            <b>Lives in </b>
          </span>
          <span>{profileUser.livesin}</span>
        </div>

        <div className="info">
          <span>
            <b>Works at </b>
          </span>
          <span>{profileUser.worksAt}</span>
        </div>

        <button className="button logout-button" onClick={handleLogOut}>Logout</button>
      </div>
    </>
  );
};

export default InfoCard;
