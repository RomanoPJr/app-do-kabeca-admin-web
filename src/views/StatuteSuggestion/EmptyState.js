import React from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";

const EmptyState = ({ handleCreate, setModalCreateOpened }) => {
  return (
    <div className="empty-container">
      <h4 className="empty-text">
        Ainda não possuímos uma sugestão e estatuto cadastrada, deseja criar uma
        nova?
      </h4>
      <Button
        className="btn-fill btn btn-info empty-button-new"
        onClick={() => setModalCreateOpened(true)}
      >
        <FaPlus />
        {` Novo`}
      </Button>
    </div>
  );
};

export default EmptyState;
