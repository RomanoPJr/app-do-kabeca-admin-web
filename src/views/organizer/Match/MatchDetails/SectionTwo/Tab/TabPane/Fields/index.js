import React, { useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { Col, Row } from "reactstrap";
import "./styles.css";

const teams = {
  team_a: "TIME A",
  team_b: "TIME B"
};

const formatName = name => {
  let formattedName = name.split(" ").map(n => {
    if (n.length > 7) {
      return `${n.slice(0, 7)}.`;
    }
    return n;
  });

  formattedName = [
    formattedName[0],
    formattedName[formattedName.length - 1]
  ].join(" ");

  return formattedName;
};

export default ({ round, matchDetails, handlePlayerClick }) => {
  return (
    <Row>
      <Field
        round={round}
        team={teams.team_a}
        teamName={matchDetails.team_a}
        matchEscalation={matchDetails.MatchEscalations}
        playerQuantity={matchDetails.players_quantity}
        handlePlayerClick={handlePlayerClick}
      />
      <Field
        round={round}
        team={teams.team_b}
        teamName={matchDetails.team_b}
        matchEscalation={matchDetails.MatchEscalations}
        playerQuantity={matchDetails.players_quantity}
        handlePlayerClick={handlePlayerClick}
      />
    </Row>
  );
};

const Field = ({
  team,
  round,
  teamName,
  playerQuantity,
  matchEscalation,
  handlePlayerClick
}) => {
  const findPlayer = useCallback(({ i, team, round }) => {
    if (!matchEscalation) {
      return null;
    }

    const escalation = matchEscalation.find(escalation => {
      return (
        escalation.position === i &&
        escalation.team === team &&
        escalation.round === round
      );
    });

    return escalation;
  });
  return (
    <Col md={6}>
      <div className="field-container">
        <p className="field-team-name">{teamName}</p>
        <div className="field-background">
          <Row>
            {[...Array(playerQuantity)].map((_, i) => {
              const escalation = findPlayer({ i, team, round });
              return escalation ? (
                <Player
                  team={team}
                  position={i}
                  round={round}
                  key={`player-${i}`}
                  escalation={escalation}
                  onClick={handlePlayerClick}
                />
              ) : (
                <AddPlayer
                  team={team}
                  position={i}
                  round={round}
                  key={`player-${i}`}
                  onClick={handlePlayerClick}
                />
              );
            })}
          </Row>
        </div>
      </div>
    </Col>
  );
};

const Player = ({ team, round, onClick, position, escalation }) => {
  return (
    <Col className="field-col" md={position === 0 ? 12 : 4}>
      <div
        className={`field-player field-player-edit`}
        onClick={() => onClick({ team, position, round, escalation })}
      >
        <div className="field-player-name">
          {formatName(escalation.User.name)}
        </div>
      </div>
    </Col>
  );
};

const AddPlayer = ({ team, round, onClick, position }) => {
  return (
    <Col className="field-col" md={position === 0 ? 12 : 4}>
      <div
        className={`field-player field-player-add `}
        onClick={() => onClick({ team, position, round })}
      >
        <FaPlus />
      </div>
    </Col>
  );
};
