import React from "react";

function LoadingSpinner({ size = "medium" }) {
  const spinnerSizes = { small: "25px", medium: "40px", large: "50px" };

  return (
    <div className="loading-section">
      <div
        className="loading-spinner"
        style={{ width: spinnerSizes[size], height: spinnerSizes[size] }}
      />
      <h3>Loading...</h3>
    </div>
  );
}

export default LoadingSpinner;
