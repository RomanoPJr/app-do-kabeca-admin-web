import React from "react";

import Modal from "../../../components/Modal";
import BtnGray from "../../../components/Buttons/BtnGray";
import BtnGreen from "../../../components/Buttons/BtnGreen";

export default ({ opened, setOpened, confirmAction }) => {
  return (
    <Modal opened={opened} setOpened={setOpened}>
      <h4 style={{ color: "#000" }}>
        DESEJA CRIAR UMA NOVA PARTIDA APARTIR DESTA?
      </h4>
      <div className="custom-modal-footer">
        <BtnGray text="NÃO" onClick={() => setOpened(!opened)} />
        <BtnGreen text="SIM" onClick={() => confirmAction(!opened)} />
      </div>
    </Modal>
  );
};
