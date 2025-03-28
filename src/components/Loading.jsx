import React from "react";
import "./Loading.css";
import logo from "../assets/launchpad_logo.svg";

const Loading = () => {
  return (
    <div className="loading-container">
      <img className="loading-logo" src={logo} alt="LaunchPad Kerala logo" />
      <div className="spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loading; 