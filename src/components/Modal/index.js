import React from "react";
import { Modal, ModalBody } from "reactstrap";

const ModalComponent = ({
  title,
  opened,
  setOpened,
  children,
  unmountOnClose,
  size = "md"
}) => {
  return (
    <Modal
      isOpen={opened}
      toggle={() => setOpened(!opened)}
      // unmountOnClose={unmountOnClose}
      size={size}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {title}
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-hidden="true"
          onClick={() => setOpened(!opened)}
        >
          <i className="tim-icons icon-simple-remove" />
        </button>
      </div>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default ModalComponent;