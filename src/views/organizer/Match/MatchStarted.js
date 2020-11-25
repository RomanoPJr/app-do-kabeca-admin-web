import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBody, Col, Button } from "reactstrap";

import "./styles.css";
import history from "../../../history";
// import ModalEvents from "./ModalEvents";
import EscalationEvent from "./EscalationEvent";
import Container from "../../../components/Container";
import CardHeader from "../../../components/CardHeader";

const MatchStarted = ({ data, events, handleSelectEvent }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [currentPlayerEvent, setCurrentPlayerEvent] = useState();
  useEffect(() => {
    if (data && data !== undefined && data.escalation) {
    } else {
      history.replace("/matches");
    }
  }, []);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16
        }}
      >
        <CardHeader title="PARTIDA EM ANDAMENTO" />
        <Button color="primary" className="btn-finish-match">
          FINALIZAR PARTIDA
        </Button>
      </div>
      <CardBody>
        <Col md="12" className="timer-container">
          <b className="timer-tempo">TEMPO</b>
          <p className="timer-time">
            21:30
            <i> 1T</i>
          </p>
        </Col>
        {data && data.escalation && (
          <div className="match-started-escalation-container">
            {/* <EscalationEvent
              escalation={data.escalation}
              setModalOpened={setModalOpened}
              setCurrentPlayerEvent={setCurrentPlayerEvent}
            /> */}
          </div>
        )}
      </CardBody>
    </Container>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MatchStarted);
