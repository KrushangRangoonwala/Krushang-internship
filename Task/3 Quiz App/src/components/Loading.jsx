import React from "react";
import "./loading.css";
// import loadingGif from "./loading.gif"; // Ensure the path is correct

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <img src='loading.gif' alt="Loading..." className="loading-gif" />
        <p>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
