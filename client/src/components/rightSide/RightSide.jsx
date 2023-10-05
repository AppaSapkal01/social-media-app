import React, { useState } from "react";
import "./RightSide.css";
import TrendCard from "../trendCard/TrendCard";
import ShareModal from "../shareModal/ShareModal";
import NavIcon from "../navIcons/NavIcon";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <div className="RightSide">
        <NavIcon />

        <TrendCard />

        <button
          className="button r-button"
          onClick={() => setModalOpened(true)}
        >
          Share
        </button>
        <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
      </div>
    </>
  );
};

export default RightSide;
