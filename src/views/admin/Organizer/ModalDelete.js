import React from "react";
import { Button } from "reactstrap";
import Modal from "../../../components/Modal";

const ModalDelete = ({ opened, setOpened, removeAction, data }) => {
  return (
    <Modal title="Atenção!" opened={opened} setOpened={setOpened}>
      <h4 style={{ color: "#000" }}>
        Atenção! Ao deletar um organizador, você estará deletando
        automaticamente todos os dados e estatísticas do seu clube. Esta ação
        não poderá ser revertida, deseja continuar?
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
