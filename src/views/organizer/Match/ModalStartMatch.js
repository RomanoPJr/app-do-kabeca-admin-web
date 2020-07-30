import React from "react";
import { Button } from "reactstrap";

import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaCaretRight } from "react-icons/fa";

const ModalStartMatch = ({
  data,
  opened,
  loading,
  setOpened,
  confirmAction
}) => {
  return (
    <Modal title="INICIAR PARTIDA?" opened={opened} setOpened={setOpened}>
      <h4 style={{ color: "#000" }}>
        DEPOIS DE INICIAR PARTIDA OS DADOS NÃO PODEM SER ALTERADOS
      </h4>
      <div className="custom-modal-footer">
        <button className="btn button-close-modal">CANCELAR</button>
        <Button
          className="btn-start"
          onClick={() => confirmAction(data.id)}
          disabled={loading}
        >
          {loading && <LoadingSpinner />}
          <FaCaretRight /> INICIAR
        </Button>
      </div>
    </Modal>
  );
};

export default ModalStartMatch;
