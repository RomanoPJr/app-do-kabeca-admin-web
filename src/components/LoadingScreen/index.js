import React from "react";
import LoadingSpinner from "../LoadingSpinner";

import "./styles.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen-container">
      <LoadingSpinner size={60} />
    </div>
  );
}
