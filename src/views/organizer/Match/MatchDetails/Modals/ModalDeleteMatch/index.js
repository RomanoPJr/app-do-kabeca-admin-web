import React from "react";
import { Button } from "reactstrap";

import Modal from "../../../../../../components/Modal";
import LoadingSpinner from "../../../../../../components/LoadingSpinner";

const ModalDelete = ({ opened, setOpened, confirmAction, loading }) => {
  return (
    <Modal title="ATENÇÃO!" opened={opened} setOpened={setOpened}>
      <h4 style={{ color: "#000" }}>
        ATENÇÃO, AO DELETAR UMA PARTIDA, TODOS OS DADOS DE PONTUAÇÃO
        RELACIONADOS A ELA SÃO EXCLUÍDOS TAMBEM.
      </h4>
      <div className="custom-modal-footer">
        <Button color="success" onClick={() => setOpened(!opened)}>
          CANCELAR
        </Button>
        <Button
          color="danger"
          onClick={() => confirmAction()}
          disabled={loading}
        >
          {loading && <LoadingSpinner />}
          EXCLUIR
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
