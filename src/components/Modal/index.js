import React from "react";
import { Modal, ModalBody } from "reactstrap";

const ModalComponent = ({ title, modalOpened, setModalOpened, children }) => {
  return (
    <Modal isOpen={modalOpened} toggle={() => setModalOpened(!modalOpened)}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {title}
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-hidden="true"
          onClick={() => setModalOpened(!modalOpened)}
        >
          <i className="tim-icons icon-simple-remove" />
        </button>
      </div>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default ModalComponent;
