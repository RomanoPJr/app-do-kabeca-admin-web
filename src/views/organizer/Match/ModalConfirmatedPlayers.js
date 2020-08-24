import React from "react";
import moment from "moment";

import "./styles.css";
import Modal from "../../../components/Modal";
import {
  FaUserCheck,
  FaUserClock,
  FaShare,
  FaPaperPlane,
  FaShareAlt
} from "react-icons/fa";
import { Button } from "reactstrap";

const ModalConfirmatedPlayers = ({ data, opened, setOpened }) => {
  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="Jogadores Confirmados"
          opened={opened}
          setOpened={setOpened}
        >
          <div style={{ overflowY: "scroll", height: 400, paddingRight: 8 }}>
            {data.players.map(player => (
              <Card player={player} />
            ))}
          </div>
          <div className="custom-modal-footer">
            <Button
              className="btn-close-modal"
              onClick={() => setOpened(!opened)}
            >
              FECHAR
            </Button>
            <Button type="submit" color="primary">
              COMPARTILHAR
              <FaShareAlt style={{ marginLeft: 10 }} />
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

const Card = ({ player }) => {
  return (
    <div className="user-card">
      <div className="user-card-container1">
        <div className="user-card-container2">
          <div
            className={`user-card-avatar ${
              player.matchConfimation ? "confirmated" : "pendent"
            }`}
          >
            {player.matchConfimation ? (
              <FaUserCheck color="#FFFFFF" size={35} />
            ) : (
              <FaUserClock color="#FFFFFF" size={35} />
            )}
          </div>
          <h4 className="user-card-name">{player.name}</h4>
        </div>
        {player.matchConfimation ? (
          <div className="user-card-container3">
            <div className="user-card-container4">
              <i className="confirmated-status">Confirmado</i>
              <i className="confirmated-time">
                {moment(player.matchConfimation.createdAt).format(
                  "DD/MM HH:mm"
                )}
              </i>
            </div>
            <button className="btn btn-danger btn-icon delete-button">
              <FaUserClock />
            </button>
          </div>
        ) : (
          <div className="user-card-container3">
            <div className="user-card-container4">
              <i className="confirmated-status">Pendente</i>
            </div>

            <button className="btn btn-icon confirm-button">
              <FaUserCheck />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalConfirmatedPlayers;
