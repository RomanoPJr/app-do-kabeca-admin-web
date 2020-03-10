import React from "react";
import { Button } from "reactstrap";
import Modal from "../../components/Modal";

const ModalDelete = ({ opened, setOpened, action, data }) => {
  return (
    <Modal
      title="Deseja Excluir este registro?"
      opened={opened}
      setOpened={setOpened}
    >
      <p style={{ fontSize: 12 }}>A exclusão não poderá ser revertida...</p>
      <div className="custom-modal-footer">
        <Button color="success" onClick={() => setOpened(!opened)}>
          Cancelar
        </Button>
        <Button color="danger" onClick={() => action(data.id)}>
          Excluir
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
