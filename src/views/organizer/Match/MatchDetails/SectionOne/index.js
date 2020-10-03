import React from "react";

import "./styles.css";
import BtnActions from "./BtnAction";
import { Col, Row } from "reactstrap";
import { FaPlayCircle } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

export default ({ matchDetails }) => {
  const [placar, setPlacar] = useState();

  useEffect(() => {
    if (matchDetails) {
      setPlacar(matchDetails.placar);
    }
  }, [matchDetails]);

  return (
    <div className="section-one-container">
      <Row style={{ justifyContent: "center" }}>
        <div className="btn-actions">
          <BtnActions />
        </div>
        <div className="container-scoreboard">
          <Row className="scoreboard-timer-container">
            <FaPlayCircle color="white" size={25} />
            <div className="scoreboard-timer-2">00:00</div>
            <div className="scoreboard-timer-3">1T</div>
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
