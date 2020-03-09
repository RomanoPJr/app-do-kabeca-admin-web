import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";
import Modal from "../../components/Modal";

const ModalDelete = ({ modalOpened, setModalOpened, action, admin }) => {
  return (
    <Modal
      title="Deseja Excluir este registro?"
      modalOpened={modalOpened}
      setModalOpened={setModalOpened}
    >
      <p style={{ fontSize: 12 }}>A exclusão não poderá ser revertida...</p>
      <div className="custom-modal-footer">
        <Button color="success" onClick={() => setModalOpened(!modalOpened)}>
          Cancelar
        </Button>
        <Button color="danger" onClick={action}>
          Excluir
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
