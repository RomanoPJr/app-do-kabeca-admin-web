import React from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";

const EmptyState = ({ handleCreate, setModalCreateOpened, session }) => {

  return session.type !== 'PLAYER' ? (
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
  ) : (
    <div className="empty-container">
      <h4 className="empty-text">
        Seu clube não possui estatuto cadastrado, entre em contato com o organizador para criar um novo.
      </h4>
    </div>
  );
};

export default EmptyState;
