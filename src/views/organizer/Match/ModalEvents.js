import React from "react";

import "./styles.css";
import Modal from "../../../components/Modal";
import { Button, Badge } from "reactstrap";
import { FaCheck } from "react-icons/fa";

const ModalEvents = ({
  events,
  opened,
  setOpened,
  handleSelectEvent,
  currentPlayerEvent
}) => {
  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="ESCOLHA UM EVENTO"
          opened={opened}
          setOpened={setOpened}
        >
          <div>
            {events.map((event, i) => (
              <Card
                event={event}
                key={`event-${i}`}
                handleSelectEvent={handleSelectEvent}
                currentPlayerEvent={currentPlayerEvent}
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

const Card = ({ event, setOpened, handleSelectEvent, currentPlayerEvent }) => {
  return (
    <div className="user-card">
      <div className="user-card-container1">
        <div className="user-card-container2">
          <Badge
            style={{ marginLeft: 15 }}
            className={`event-value-badge ${event.value > 0 ? "green" : "red"}`}
          >
            {`${event.value > 0 ? "+" : ""}`}
            {event.value}
          </Badge>
          <h4 className="user-card-name">{event.description}</h4>
        </div>
        <div className="user-card-container3">
          <div className="user-card-container4"></div>
          <button
            className="btn btn-icon confirm-button"
            onClick={() => {
              handleSelectEvent({ event, player: currentPlayerEvent });
              setOpened(false);
            }}
          >
            <FaCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEvents;
