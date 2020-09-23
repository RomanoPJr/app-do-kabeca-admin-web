import React from "react";

import Modal from "../../../../../components/Modal";
import BtnGray from "../../../../../components/Buttons/BtnGray";
import BtnGreen from "../../../../../components/Buttons/BtnGreen";
import { Button } from "reactstrap";

export default ({ opened, setOpened, confirmAction }) => {
  return (
    <Modal opened={opened} setOpened={setOpened}>
      <h4 style={{ color: "#000" }}>
        DESEJA CRIAR UMA NOVA PARTIDA APARTIR DESTA?
      </h4>
      <div className="custom-modal-footer">
        <BtnGray text="NÃO" onClick={() => setOpened(!opened)} />
        <Button
          className="btn btn-save"
          color="primary"
          onClick={() => confirmAction(!opened)}
        >
          SIM
        </Button>
      </div>
    </Modal>
  );
};
