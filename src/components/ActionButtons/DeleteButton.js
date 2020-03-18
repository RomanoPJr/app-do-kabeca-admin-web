import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className="btn btn-danger btn-icon delete-button"
      // onClick={() => {
      //   setCurrentData();
      //   setModalDeleteOpened();
      // }}
      onClick={onClick}
    >
      <FaTrashAlt />
    </button>
  );
};

export default DeleteButton;
