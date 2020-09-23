import React from "react";
import { FaEdit, FaCopy, FaTrash } from "react-icons/fa";

export default ({
  setModalDeleteMatchOpened,
  setModalCloneOpened,
  setModalCreateOpened
}) => {
  return (
    <div className="step-three-container" style={{ marginBottom: 35 }}>
      <button
        className="btn btn-save"
        onClick={() => setModalCreateOpened(true)}
      >
        <FaEdit />
        {`EDITAR`}
      </button>
      <button
        className="btn btn-start"
        onClick={() => setModalCloneOpened(true)}
      >
        <FaCopy />
        {`CLONAR`}
      </button>
      <button
        className="btn delete-button"
        onClick={() => setModalDeleteMatchOpened(true)}
      >
        <FaTrash />
        {`DELETAR`}
      </button>
    </div>
  );
};
