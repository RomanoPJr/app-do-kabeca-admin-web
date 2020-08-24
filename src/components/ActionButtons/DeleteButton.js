import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const DeleteButton = ({ onClick }) => {
  return (
    <button className="btn btn-icon delete-button" onClick={onClick}>
      <FaTrashAlt />
    </button>
  );
};

export default DeleteButton;
