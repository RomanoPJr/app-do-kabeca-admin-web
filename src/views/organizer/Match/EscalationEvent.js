import React from "react";
import { Col, Row } from "reactstrap";

function EscalationEvent({
  escalation,
  setModalOpened,
  setCurrentPlayerEvent
}) {
  return (
    <Row>
      <Col md={6}>
        <Col md={12}>
          <Field
            team="team_a"
            teamName="TIME A"
            escalation={escalation.team_a}
            setModalOpened={setModalOpened}
            setCurrentPlayerEvent={setCurrentPlayerEvent}
          />
        </Col>
      </Col>
      <Col md={6}>
        <Col md={12}>
          <Field
            invert
            team="team_b"
            teamName="TIME B"
            escalation={escalation.team_b}
            setModalOpened={setModalOpened}
            setCurrentPlayerEvent={setCurrentPlayerEvent}
          />
        </Col>
      </Col>
    </Row>
  );
}

const Field = ({
  team,
  teamName,
  escalation,
  setModalOpened,
  invert = false,
  setCurrentPlayerEvent
}) => {
  return (
    <div className="escalation-container">
      <p className="field-team-name">{teamName}</p>
      <div className={`field-container ${invert ? "invert" : ""}`}>
        <Row className="field-player-row">
          {escalation.map((player, i) => (
            <Col className="field-player-col" md={i === 0 ? 12 : 4}>
              <Player
                index={i}
                team={team}
                teamName={teamName}
                invert={invert}
                player={player}
                setModalOpened={setModalOpened}
                setCurrentPlayerEvent={setCurrentPlayerEvent}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const Player = ({
  team,
  player,
  invert,
  teamName,
  setModalOpened,
  setCurrentPlayerEvent
}) => {
  return (
    <div
      onClick={() => {
        setCurrentPlayerEvent({ ...player, team, teamName });
        setModalOpened(true);
      }}
      className={`field-player field-player-add-event ${
        invert ? "invert" : ""
      }`}
    >
      <div className="field-player-name">{player.name}</div>
    </div>
  );
};

export default EscalationEvent;
