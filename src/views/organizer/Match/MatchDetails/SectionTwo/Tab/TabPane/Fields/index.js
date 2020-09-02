import React, { useCallback } from "react";
import { FaPlus, FaPlay } from "react-icons/fa";
import { Col, Row, Button } from "reactstrap";
import moment from "moment";
import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";
import ReactStopwatch from "react-stopwatch";

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
    formattedName.length > 1 ? formattedName[formattedName.length - 1] : ""
  ].join(" ");

  return formattedName;
};

export default ({
  round,
  matchDetails,
  handlePlayerClick,
  handleExternalGoal,
  handleStartTime
}) => {
  const [timer, setTimer] = useState();
  const [formatedTimer, setFormatedTimer] = useState();
  const [minute, setMinute] = useState(50);

  useEffect(() => {
    if (round === "1º TEMPO") {
      setTimer(matchDetails.timer_1);
    } else {
      setTimer(matchDetails.timer_2);
    }
  }, []);

  useEffect(() => {
    if (timer) {
      let start = moment(timer);
      let end = moment(new Date());
      let diff = end.diff(start);
      setFormatedTimer(moment.utc(diff).format("mm:ss"));
    }
  }, [timer]);

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
      <Timer
        timer={timer}
        round={round}
        matchDetails={matchDetails}
        handleStartTime={handleStartTime}
        formatedTimer={formatedTimer}
        minute={minute}
        setMinute={setMinute}
      />
      <Field
        round={round}
        team={teams.team_b}
        matchType={matchDetails.type}
        teamName={matchDetails.team_b}
        matchEscalation={matchDetails.MatchEscalations}
        playerQuantity={matchDetails.players_quantity}
        handlePlayerClick={handlePlayerClick}
        handleExternalGoal={handleExternalGoal}
      />
    </Row>
  );
};

const Timer = ({
  timer,
  round,
  matchDetails,
  handleStartTime,
  formatedTimer,
  minute,
  setMinute
}) => {
  return (
    <Col
      md={2}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <p>{round}</p>
      {!timer && !formatedTimer && formatedTimer === undefined ? (
        <h1 style={{ margin: 0 }}>--:--</h1>
      ) : (
        <ReactStopwatch
          // seconds={formatedTimer ? formatedTimer.split(":")[1] : 0}
          hours={0}
          seconds={0}
          minutes={0}
          limit={`00:${matchDetails.duration.toString().padStart(2, "0")}:00`}
          onCallback={() => console.log("Finish")}
          render={({ minutes, seconds }) => {
            return (
              <div>
                <h1>
                  {minutes ? minutes.toString().padStart(2, "0") : "00"}:
                  {seconds ? seconds.toString().padStart(2, "0") : "00"}
                </h1>
              </div>
            );
          }}
        />
      )}
      <Button
        className="btn btn-start"
        style={{ marginTop: 25 }}
        onClick={() => handleStartTime(matchDetails.round)}
      >
        <FaPlay />
      </Button>
    </Col>
  );
};
const Field = ({
  team,
  round,
  teamName,
  matchType,
  playerQuantity,
  matchEscalation,
  handlePlayerClick,
  handleExternalGoal
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
    <Col md={5}>
      <div className="field-container">
        <p className="field-team-name">{teamName}</p>
        <div className="field-background">
          {matchType === undefined || matchType === "PARTIDA INTERNA" ? (
            <Row style={{ justifyContent: "center" }}>
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
          ) : (
            <ExternalPlayer handleExternalGoal={handleExternalGoal} />
          )}
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

const ExternalPlayer = ({ handleExternalGoal }) => {
  return (
    <Col className="field-col" md={12}>
      <div
        className={`field-player field-player-edit`}
        onClick={handleExternalGoal}
      >
        <div className="field-player-name" style={{ fontSize: 25 }}>
          GOL
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
