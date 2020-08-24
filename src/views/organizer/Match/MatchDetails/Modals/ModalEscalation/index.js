import React from "react";
import moment from "moment";
import { Button } from "reactstrap";
import { FaUserCheck } from "react-icons/fa";

import "./styles.css";
import Modal from "../../../../../../components/Modal";

export default ({ data, opened, setOpened, handleSelectPlayer }) => {
  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="Escolha um Jogador"
          opened={opened}
          setOpened={setOpened}
        >
          <div className="modal-escalation-list">
            {data.map((player, i) => (
              <Card
                player={player}
                setOpened={setOpened}
                key={`list-player-${i}`}
                handleSelectPlayer={handleSelectPlayer}
              />
            ))}
          </div>
          <div className="custom-modal-footer">
            <Button
              className="btn-close-modal"
              onClick={() => setOpened(!opened)}
            >
              FECHAR
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

const Card = ({ player, handleSelectPlayer, setOpened }) => {
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
          </div>
        )}
        <button
          className="btn btn-icon confirm-button"
          onClick={() => {
            handleSelectPlayer(player);
            setOpened(false);
          }}
        >
          <FaUserCheck />
        </button>
      </div>
    </div>
  );
};
