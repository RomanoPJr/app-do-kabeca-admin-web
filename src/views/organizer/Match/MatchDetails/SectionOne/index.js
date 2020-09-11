import React from "react";
import { FaEdit, FaCopy } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";

export default ({
  match,
  setModalStartMatchOpened,
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
        {`NOVA PARTIDA`}
      </button>
      <button
        className="btn btn-start"
        onClick={() => setModalStartMatchOpened(true)}
      >
        <GiWhistle size={20} />
        {`FINALIZAR PARTIDA`}
      </button>
    </div>
  );
};
