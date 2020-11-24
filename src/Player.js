import React from "react";
import Body from "./Body";
import Footer from "./Footer";
import "./Player.css";
import SideBar from "./SideBar";
function Player({ spotify }) {
  return (
    <div className="payer">
      <div className="player__body">
        <SideBar />
        <Body spotify={spotify} />
      </div>
      <Footer />
    </div>
  );
}

export default Player;
