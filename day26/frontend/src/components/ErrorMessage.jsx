import React from "react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-section">
      <h2>⚠️ Failed to Load Data</h2>
      <p>{message}</p>
      <button onClick={onRetry}>🔄 Try Again</button>
    </div>
  );
}

export default ErrorMessage;
