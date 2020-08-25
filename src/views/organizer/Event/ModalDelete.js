import React from "react";
import { Button } from "reactstrap";
import Modal from "../../../components/Modal";

const ModalDelete = ({ opened, setOpened, removeAction, data }) => {
  return (
    <Modal title="ATENÇÃO!" opened={opened} setOpened={setOpened}>
      <h4 style={{ color: "#000" }}>
        ATENÇÃO! AO DELETAR UM EVENTO, ELE SERÁ TAMBÉM REMOVIDO DAS ESTATÍSTICAS
        DOS JOGADORES.
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
