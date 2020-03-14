import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Button, CardHeader, CardTitle } from "reactstrap";

const EmptyState = ({
  listLength,
  setModalCreateOpened,
  setModalDeleteOpened
}) => {
  return (
    <CardHeader className="card-header-with-button">
      <CardTitle tag="h4">Sugestão de Estatuto</CardTitle>
      {listLength > 0 && (
        <div>
          <Button
            className="btn-fill btn btn-danger"
            onClick={() => setModalDeleteOpened(true)}
          >
            <FaTrashAlt />
            {` Deletar`}
          </Button>
          <Button
            className="btn-fill btn btn-primary"
            onClick={() => setModalCreateOpened(true)}
          >
            <FaRegEdit />
            {` Editar`}
          </Button>
        </div>
      )}
    </CardHeader>
  );
};

export default EmptyState;
