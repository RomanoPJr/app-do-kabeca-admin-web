import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Button, CardHeader, CardTitle } from "reactstrap";

const EmptyState = ({ data, setModalCreateOpened, setModalDeleteOpened }) => {
  return (
    <CardHeader className="card-header-with-button">
      <CardTitle tag="h4">Sugestão de Estatuto</CardTitle>
      {data && (
        <div>
          <Button
            className="btn-fill btn btn-danger"
            onClick={() => setModalDeleteOpened(true)}
          >
            <FaTrashAlt />
            {` Deletar`}
          </Button>
          <Button
            className="btn-fill btn btn-info"
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
