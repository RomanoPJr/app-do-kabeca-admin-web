import React from "react";
import { FaSpinner } from "react-icons/fa";

import "./styles.css";

const LoadingSpinner = ({ color, size }) => {
  const style = {};

  if (color) {
    style.color = color;
  }

  if (size) {
    style.size = size;
  }

  return <FaSpinner className="loading-spinner" {...style} />;
};

export default LoadingSpinner;
