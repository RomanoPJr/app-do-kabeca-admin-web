import React from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";

const EmptyState = ({ handleCreate, setModalCreateOpened }) => {
  return (
    <div className="empty-container">
      <h4 className="empty-text">
        Você ainda não possui um estatuto cadastrado, deseja criar um novo?
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
