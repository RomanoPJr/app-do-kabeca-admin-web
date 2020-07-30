import React from "react";
import { FaPlus } from "react-icons/fa";
import { Col, Row } from "reactstrap";

function Escalation({
  data,
  escalation,
  setModalOpened,
  setCurrentClimb,
  removePlayer
}) {
  return (
    <Row>
      <Col md={6}>
        <Col md={12}>
          <Field
            team="team_a"
            removePlayer={removePlayer}
            escalation={escalation.team_a}
            setModalOpened={setModalOpened}
            setCurrentClimb={setCurrentClimb}
          />
        </Col>
      </Col>
      <Col md={6}>
        <Col md={12}>
          <Field
            team="team_b"
            removePlayer={removePlayer}
            escalation={escalation.team_b}
            setModalOpened={setModalOpened}
            setCurrentClimb={setCurrentClimb}
          />
        </Col>
      </Col>
    </Row>
  );
}

const Field = ({
  escalation,
  team,
  setModalOpened,
  setCurrentClimb,
  removePlayer
}) => {
  const [_, ...rest] = escalation;

  return (
    <div className="escalation-container">
      <p className="field-team-name">{`${
        team === "team_a" ? "TIME A" : "TIME B"
      }`}</p>
      <div className={`field-container ${team === "team_b" ? "invert" : ""}`}>
        <Row className="field-player-row">
          <Col className="field-player-col" md={4}>
            <Player
              index={0}
              team={team}
              setModalOpened={setModalOpened}
              setCurrentClimb={setCurrentClimb}
              player={escalation[0]}
              removePlayer={removePlayer}
            />
          </Col>
        </Row>
        <Row className="field-player-row">
          {[...rest].map((player, i) => (
            <Col className="field-player-col" md={4}>
              <Player
                team={team}
                index={i + 1}
                player={player}
                removePlayer={removePlayer}
                setModalOpened={setModalOpened}
                setCurrentClimb={setCurrentClimb}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const Player = ({
  index,
  team,
  setModalOpened,
  setCurrentClimb,
  player,
  removePlayer
}) => {
  return (
    <div
      className={`field-player
      ${!player ? "field-player-add" : "field-player-remove"}
      ${team === "team_b" ? "invert" : ""}`}
      onClick={() => {
        if (!player) {
          setModalOpened(true);
          setCurrentClimb({ index, team });
        } else {
          removePlayer({ index, team, player });
        }
      }}
    >
      {player ? (
        <div className="field-player-name">{player.name}</div>
      ) : (
        <FaPlus />
      )}
    </div>
  );
};

export default Escalation;
