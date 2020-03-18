import React from "react";
import { FaPlus } from "react-icons/fa";
import { Button, CardHeader, CardTitle } from "reactstrap";

const EmptyState = ({
  listLength,
  setModalCreateOpened,
  setModalDeleteOpened
}) => {
  return (
    <CardHeader className="card-header-with-button">
      <CardTitle tag="h4">Organizadores</CardTitle>
      <div>
        <Button
          className="btn-fill btn btn-info"
          onClick={() => setModalCreateOpened(true)}
        >
          <FaPlus />
          {` Novo`}
        </Button>
      </div>
    </CardHeader>
  );
};

export default EmptyState;
