import React from "react";
import { Button } from "reactstrap";

import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalDelete = ({ opened, setOpened, confirmAction, data, loading }) => {
  return (
    <Modal title="Atenção!" opened={opened} setOpened={setOpened}>
      <h4 style={{ color: "#000" }}>
        Atenção! Ao remover um jogador do seu clube, todo o seu histórico
        estatistico será automaticamente apagado. Deseja continuar?
      </h4>
      <div className="custom-modal-footer">
        <Button color="success" onClick={() => setOpened(!opened)}>
          Cancelar
        </Button>
        <Button
          color="danger"
          onClick={() => confirmAction(data.id)}
          disabled={loading}
        >
          {loading && <LoadingSpinner />}
          Excluir
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
