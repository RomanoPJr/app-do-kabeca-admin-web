import moment from "moment";
import React from "react";
import { FaUserCheck, FaUserClock } from "react-icons/fa";
import { Button } from "reactstrap";
import Modal from "../../../../../../components/Modal";
import "./styles.css";

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
            {data &&
              data.map((player, i) => (
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

const Card = ({ player, handleSelectPlayer }) => {
  return (
    <div
      className={`option-card ${
        player.MatchInviteConfirmations ? "check" : ""
      }`}
      onClick={() => handleSelectPlayer(player)}
    >
      <div className="option-icon-container">
        {player.MatchInviteConfirmations ? (
          <FaUserCheck className="option-player-icon check" />
        ) : (
          <FaUserClock className="option-player-icon" />
        )}
      </div>
      <div>
        <p
          className={`option-text ${
            player.MatchInviteConfirmations ? "check" : ""
          }`}
        >
          {player.User.name}
        </p>
        {player.MatchInviteConfirmations ? (
          <p
            style={{
              fontSize: 12,
              margin: 0,
              marginTop: "-10px",
              color: "rgb(81, 190, 81)"
            }}
          >
            CONFIRMAÇÃO:{" "}
            {moment(player.MatchInviteConfirmations.created_at)
              .utc()
              .format("DD/MM/YYYY HH:mm")}
          </p>
        ) : (
          <p
            style={{
              fontSize: 12,
              margin: 0,
              marginTop: "-10px",
              color: "rgb(141, 140, 140)"
            }}
          >
            SEM CONFIRMAÇÃO
          </p>
        )}
      </div>
    </div>
  );
};
