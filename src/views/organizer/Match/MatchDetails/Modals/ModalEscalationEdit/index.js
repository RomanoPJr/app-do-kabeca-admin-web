import React from "react";
import moment from "moment";
import { Button, Badge } from "reactstrap";
import {
  FaUserCheck,
  FaSync,
  FaFlagCheckered,
  FaPlus,
  FaFootballBall,
  FaFutbol,
  FaCheck
} from "react-icons/fa";

import "./styles.css";
import Modal from "../../../../../../components/Modal";

export default ({
  data,
  events,
  opened,
  setOpened,
  handleEventAction,
  handleReplaceOption,
  handleRemoveOption,
  handleGoalOption
}) => {
  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="Opções"
          opened={opened}
          setOpened={setOpened}
        >
          <div className="options-container">
            <div className="option-card" onClick={handleGoalOption}>
              <div className="option-icon-container">
                <FaFutbol className="option-icon" />
              </div>
              <p className="option-text">GOL</p>
            </div>
            {events.map((event, i) => {
              return (
                <CardEvents
                  event={event}
                  key={`event-${i}`}
                  handleEventAction={handleEventAction}
                  setOpened={setOpened}
                />
              );
            })}

            <div className="option-card" onClick={handleReplaceOption}>
              <div className="option-icon-container">
                <FaSync className="option-icon" />
              </div>
              <p className="option-text">SUBSTITUIR</p>
            </div>
            <div className="option-card" onClick={handleRemoveOption}>
              <div className="option-icon-container">
                <FaPlus className="option-icon" />
              </div>
              <p className="option-text">REMOVER</p>
            </div>
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

const CardEvents = ({ event, setOpened, handleEventAction }) => {
  return (
    <div className="option-card" onClick={() => handleEventAction(event)}>
      <div className="option-icon-container">
        <FaFlagCheckered className="option-icon" />
      </div>
      <Badge
        style={{ marginRight: 25 }}
        className={`event-value-badge ${event.value > 0 ? "green" : "red"}`}
      >
        {`${event.value > 0 ? "+" : ""}`}
        {event.value}
      </Badge>
      <p className="option-text">{event.description}</p>
    </div>
  );
};
