import React from "react";
import moment from "moment";

import "./styles.css";
import Modal from "../../../components/Modal";
import { Button } from "reactstrap";
import { FaUserCheck } from "react-icons/fa";

const ModalEscalationPlayers = ({
  data,
  opened,
  setOpened,
  handleSetPlayer
}) => {
  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="Escolha um Jogador"
          opened={opened}
          setOpened={setOpened}
        >
          <div>
            {data.map(player => (
              <Card
                player={player}
                handleSetPlayer={handleSetPlayer}
                setOpened={setOpened}
              />
            ))}
          </div>
          <div className="custom-modal-footer">
            <Button
              className="button-close-modal"
              onClick={() => setOpened(!opened)}
            >
              Fechar
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

const Card = ({ player, handleSetPlayer, setOpened }) => {
  return (
    <div className="user-card">
      <div className="user-card-container1">
        <div className="user-card-container2">
          <h4 className="user-card-name">{player.name}</h4>
        </div>
        {player.matchConfimation && (
          <div className="user-card-container3">
            <div className="user-card-container4">
              <i className="confirmated-status">Confirmado</i>
              <i className="confirmated-time">
                {moment(player.matchConfimation.createdAt).format(
                  "DD/MM HH:mm"
                )}
              </i>
            </div>
            <button
              className="btn btn-icon confirm-button"
              onClick={() => {
                handleSetPlayer({ player });
                setOpened(false);
              }}
            >
              <FaUserCheck />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalEscalationPlayers;
