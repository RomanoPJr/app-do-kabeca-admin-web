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
        <Col md={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          <BtnActions />
        </Col>
        <Col md={5} style={{ marginTop: 30 }}>
          <div className="container-scoreboard">
            <Row className="scoreboard-timer-container">
              <Col
                md={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 0
                }}
              >
                <FaPlayCircle color="white" size={35} />
              </Col>
              <Col
                md={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 0
                }}
              >
                <div className="scoreboard-timer-2">00:00</div>
              </Col>
              <Col
                md={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 0
                }}
              >
                <div className="scoreboard-timer-3">1T</div>
              </Col>
            </Row>
            <Row className="scoreboard-score-container">
              <Col md={5}>
                <div className="scoreboard-score-number">
                  <p className="scoreboard-score-number-text">
                    {placar ? placar.team_a_goals : 0}
                  </p>
                </div>
              </Col>
              <Col md={2} className="scoreboard-score-separator">
                X
              </Col>
              <Col md={5}>
                <div className="scoreboard-score-number">
                  <p className="scoreboard-score-number-text">
                    {placar ? placar.team_b_goals : 0}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
