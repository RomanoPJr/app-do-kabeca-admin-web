import React from "react";

import "./styles.css";
import BtnActions from "./BtnAction";
import { Col, Row } from "reactstrap";
import { FaPlayCircle } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

export default ({
  session,
  matchDetails,
  setModalCreateOpened,
  setModalCloneOpened,
  setModalDeleteMatchOpened
}) => {
  const [placar, setPlacar] = useState();

  useEffect(() => {
    if (matchDetails) {
      setPlacar(matchDetails.placar);
    }
  }, [matchDetails]);

  return (
    <div className="section-one-container">
      <Row style={{ justifyContent: "center" }}>
        {session.type === 'ORGANIZER' &&
          <div className="btn-actions">
            <BtnActions
              setModalCreateOpened={setModalCreateOpened}
              setModalCloneOpened={setModalCloneOpened}
              setModalDeleteMatchOpened={setModalDeleteMatchOpened}
            />
          </div>
        }
        <div className="container-scoreboard">
          <Row className="scoreboard-timer-container">
            <Col
              md={3}
              xs={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 0
              }}
            >
              <FaPlayCircle color="white" size={25} />
            </Col>
            <Col
              md={6}
              xs={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="scoreboard-timer-2">00:00</div>
            </Col>
            <Col md={3} xs={3}>
              <div />
            </Col>
          </Row>
          <div className="scoreboard-score-container">
            <div className="scoreboard-score-number">
              <p className="scoreboard-score-number-text">
                {placar ? placar.team_a_goals : 0}
              </p>
            </div>
            <div className="scoreboard-score-separator">X</div>
            <div className="scoreboard-score-number">
              <p className="scoreboard-score-number-text">
                {placar ? placar.team_b_goals : 0}
              </p>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};
