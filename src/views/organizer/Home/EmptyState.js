import React from "react";
import { FaCog } from "react-icons/fa";
import { Button } from "reactstrap";
import history from "../../../history";
const EmptyState = () => {
  return (
    <div className="empty-container">
      <h4 className="empty-text">
        Você ainda não configurou seu clube, deseja configuar agora?
      </h4>
      <Button
        className="btn-fill btn btn-info empty-button-new"
        onClick={() => history.push("club")}
      >
        <FaCog />
        {` Configuração de Clube`}
      </Button>
    </div>
  );
};

export default EmptyState;
