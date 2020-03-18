import React from "react";
import { FaEdit } from "react-icons/fa";

const EditButton = ({ onClick }) => {
  return (
    <button className="btn btn-default btn-icon" onClick={onClick}>
      <FaEdit />
    </button>
  );
};

export default EditButton;
