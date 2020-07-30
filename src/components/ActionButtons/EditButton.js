import React from "react";
import { FaEdit } from "react-icons/fa";

const EditButton = ({ onClick }) => {
  return (
    <button className="btn btn-icon btn-edit" onClick={onClick}>
      <FaEdit />
    </button>
  );
};

export default EditButton;
