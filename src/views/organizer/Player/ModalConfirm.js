import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "reactstrap";

import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({ action, loading, opened, setOpened }) => {
  return (
    opened && (
      <Modal
        className="modal fade"
        title="Confirmar"
        opened={opened}
        setOpened={setOpened}
      >
        <h4 style={{ color: "#000", textAlign: "center" }}>
          Você confirma a redefinição de senha?
        </h4>
        <p style={{ color: "#000" }}>
          Após a redefinição, será solicitado ao usuário a criação de uma nova
          senha em seu próximo login.
        </p>
        <div className="custom-modal-footer">
          <Button color="secondary" onClick={() => setOpened(!opened)}>
            Fechar
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={loading}
            onClick={action}
          >
            {loading && <LoadingSpinner />}
            Salvar
          </Button>
        </div>
      </Modal>
    )
  );
};

export default ModalCreate;
