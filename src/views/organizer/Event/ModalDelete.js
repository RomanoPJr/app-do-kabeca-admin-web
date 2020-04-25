import React from "react";
import { Button } from "reactstrap";
import Modal from "../../../components/Modal";

const ModalDelete = ({ opened, setOpened, removeAction, data }) => {
  return (
    <Modal title="Atenção!" opened={opened} setOpened={setOpened}>
      <h4 style={{ color: "#000" }}>
        Atenção! Ao deletar um evento, ele será também removido das estatísticas
        dos jogadores.
      </h4>
      <div className="custom-modal-footer">
        <Button color="success" onClick={() => setOpened(!opened)}>
          Cancelar
        </Button>
        <Button color="danger" onClick={() => removeAction(data.id)}>
          Excluir
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
