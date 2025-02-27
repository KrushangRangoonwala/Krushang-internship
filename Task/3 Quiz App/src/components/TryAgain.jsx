import React from "react";
import "./TryAgain.css";

const TryAgain = () => {
  const handleRefresh = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <div className="try-again-overlay">
      <div className="try-again-container">
        <p>Something went wrong!</p>
        <button onClick={handleRefresh} className="try-again-button">
          Try Again 🔄
        </button>
      </div>
    </div>
  );
};

export default TryAgain;
