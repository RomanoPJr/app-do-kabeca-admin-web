import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { FaEdit, FaCopy } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";

export default ({
  setModalStartMatchOpened,
  setModalCloneOpened,
  setModalCreateOpened
}) => {
  return (
    <Card>
      <div className="step-three-container">
        <CardHeader title="DETALHES DA PARTIDA" />
        <CardBody className="step-three-btn-container">
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
        </CardBody>
      </div>
    </Card>
  );
};
