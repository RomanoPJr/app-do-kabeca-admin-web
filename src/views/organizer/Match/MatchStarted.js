import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBody, Col, Badge, Button } from "reactstrap";

import "./styles.css";
import history from "../../../history";
import ModalEvents from "./ModalEvents";
import EscalationEvent from "./EscalationEvent";
import ModalDeleteEvent from "./ModalDeleteEvent";
import Container from "../../../components/Container";
import CardHeader from "../../../components/CardHeader";
import Table from "../../../components/Table";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const MatchStarted = ({ data, events, handleSelectEvent, matchEvents }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [currentPlayerEvent, setCurrentPlayerEvent] = useState();
  const [currentModalDeleteData, setCurrentModalDeleteData] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();

  useEffect(() => {
    if (data && data !== undefined && data.escalation) {
    } else {
      history.replace("/organizer/matches");
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
            <EscalationEvent
              escalation={data.escalation}
              setModalOpened={setModalOpened}
              setCurrentPlayerEvent={setCurrentPlayerEvent}
            />
          </div>
        )}
        <div style={{ marginTop: 35 }} />
        <CardHeader title="EVENTOS" />
        <Table
          // setPageNumber={setPageNumber}
          // isLoading={matchEvents.loading}
          data={matchEvents}
          columns={[
            { name: "Jogador", render: () => "Nome do Jogador" },
            { name: "Time", attribute: "user_team_name" },
            { name: "Evento", attribute: "event_description" },
            {
              name: "Pontos",
              render: ({ data }) => (
                <Badge
                  style={{ marginLeft: 15 }}
                  className={`event-value-badge ${
                    data.event_value > 0 ? "green" : "red"
                  }`}
                >
                  {`${data.event_value > 0 ? "+" : ""}`}
                  {data.event_value}
                </Badge>
              )
            },
            {
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  setCurrentData={setCurrentModalDeleteData}
                  setModalDeleteOpened={setModalDeleteOpened}
                />
              )
            }
          ]}
        />
      </CardBody>
      {modalDeleteOpened && (
        <ModalDeleteEvent
          removeAction={() => {}}
          opened={modalDeleteOpened}
          data={currentModalDeleteData}
          setOpened={setModalDeleteOpened}
        />
      )}
      {modalOpened && (
        <ModalEvents
          events={events}
          opened={modalOpened}
          setOpened={setModalOpened}
          handleSelectEvent={handleSelectEvent}
          currentPlayerEvent={currentPlayerEvent}
        />
      )}
    </Container>
  );
};

const ActionColumn = ({ data, setCurrentData, setModalDeleteOpened }) => (
  <div className="action-column">
    <DeleteButton
      onClick={() => {
        setCurrentData(data);
        setModalDeleteOpened(true);
      }}
    />
  </div>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MatchStarted);
