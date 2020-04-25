import React from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";

const EmptyState = ({ setModalCreateOpened }) => {
  return (
    <div className="empty-container">
      <h4 className="empty-text">
        Clique em "NOVO CLUBE" para fazer as configurações iniciais do seu clube
      </h4>
      <Button
        className="btn-fill btn btn-info empty-button-new"
        onClick={() => setModalCreateOpened(true)}
      >
        <FaPlus />
        {`Novo Clube`}
      </Button>
    </div>
  );
};

export default EmptyState;
