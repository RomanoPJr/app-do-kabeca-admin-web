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
      <Row>
        <Col md={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          <BtnActions />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: 25,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Col md={6} xs={12} style={{ margin: 0, padding: 0 }}>
          <div className="team_a_container" />
        </Col>
        <Col md={6} xs={12} style={{ margin: 0, padding: 0 }}>
          <div className="team_a_container" />
        </Col>
        <div className="vs_container">
          <div className="vs-text">VS</div>
        </div>
      </Row>
    </div>
  );
};
