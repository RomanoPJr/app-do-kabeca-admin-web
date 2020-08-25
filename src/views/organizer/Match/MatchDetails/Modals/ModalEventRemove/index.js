import React, { useState } from "react";
import { Button } from "reactstrap";

import Modal from "../../../../../../components/Modal";
import LoadingSpinner from "../../../../../../components/LoadingSpinner";

export default ({ opened, setOpened, confirmAction }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal title="ATENÇÃO!" opened={opened} setOpened={setOpened}>
      <h4 style={{ color: "#000" }}>DESEJA MESMO APAGAR ESTE EVENTO?</h4>
      <div className="custom-modal-footer">
        <Button color="success" onClick={() => setOpened(!opened)}>
          CANCELAR
        </Button>
        <Button
          color="danger"
          onClick={async () => {
            setLoading(true);
            await confirmAction();
            setLoading(false);
          }}
          disabled={loading}
        >
          {loading && <LoadingSpinner />}
          EXCLUIR
        </Button>
      </div>
    </Modal>
  );
};
