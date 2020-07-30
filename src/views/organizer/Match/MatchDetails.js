import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBody, Button, Col, Input, Row } from "reactstrap";

import "./styles.css";
import Escalation from "./Escalation";
import Modal from "./ModalEscalationPlayers";
import ModalStartMatch from "./ModalStartMatch";
import Container from "../../../components/Container";
import CardHeader from "../../../components/CardHeader";
import {
  FaPlus,
  FaSave,
  FaFutbol,
  FaArrowLeft,
  FaArrowRight,
  FaPaperPlane
} from "react-icons/fa";

const MatchDetails = ({ setCurrentData, currentData, history }) => {
  const [players, setPlayers] = useState();
  const [currentClimb, setCurrentClimb] = useState();
  const [modalOpened, setModalOpened] = useState(false);
  const [data, setData] = useState({ team_a: [], team_b: [] });
  const [escalation, setEscalation] = useState({ team_a: [], team_b: [] });
  const [modalStartMatchOpened, setModalStartMatchOpened] = useState(false);

  useEffect(() => {
    if (currentData) {
      setData(currentData);
      setPlayers(currentData.players);
      setEscalation({
        team_a: Array(parseInt(currentData.players_quantity)),
        team_b: Array(parseInt(currentData.players_quantity))
      });
    } else {
      history.replace("/organizer/matches");
    }
  }, []);

  const handleSetData = value => {
    setData({
      ...data,
      ...value
    });
  };

  const handleSetPlayer = ({ player }) => {
    const newEscalation = { ...escalation };
    newEscalation[currentClimb.team][currentClimb.index] = { ...player };
    setEscalation(newEscalation);
    setPlayers(players.filter(item => item.id !== player.id));
  };

  const removePlayer = ({ player, index, team }) => {
    const removedPlayer = escalation[team][index];

    //RETURNS PLAYER TO PLAYERS ARRAY
    const newPlayers = [...players];
    newPlayers.unshift(removedPlayer);

    setPlayers(newPlayers);

    //REMOVES FROM ESCALATION ARRAY
    const newEscalation = { ...escalation };
    newEscalation[team][index] = null;

    setEscalation(newEscalation);
  };

  const handleStartMatch = () => {
    setModalStartMatchOpened(false);
    setCurrentData({ ...data, escalation });
    history.replace("/organizer/matches/details/started");
  };

  return (
    <>
      <StepOne
        setData={handleSetData}
        setEscalation={setEscalation}
        currentData={data}
        setPlayers={setPlayers}
      />
      <Container className="escalation-super-container">
        <CardHeader title="2º Passo - Escalação" />
        <CardBody>
          <Escalation
            data={data}
            escalation={escalation}
            setModalOpened={setModalOpened}
            setCurrentClimb={setCurrentClimb}
            removePlayer={removePlayer}
          />
        </CardBody>
      </Container>
      <StepThree setModalStartMatchOpened={setModalStartMatchOpened} />
      {modalOpened && (
        <Modal
          data={players}
          opened={modalOpened}
          setOpened={setModalOpened}
          handleSetPlayer={handleSetPlayer}
        />
      )}
      {modalStartMatchOpened && (
        <ModalStartMatch
          data={players}
          opened={modalStartMatchOpened}
          setOpened={setModalStartMatchOpened}
          confirmAction={handleStartMatch}
        />
      )}
    </>
  );
};

const StepOne = ({ currentData, setData, setEscalation, setPlayers }) => {
  return (
    !currentData !== undefined && (
      <Container loading={currentData === undefined}>
        <CardHeader title="1º Passo - Detalhes da Partida" />
        <CardBody>
          <div className="input-container ">
            <Row>
              <Col md="3">
                <label>TIME A</label>
                <Input
                  type="text"
                  value={currentData.team_a}
                  onChange={v => {
                    setData({
                      team_a: v.target.value
                    });
                  }}
                />
              </Col>
              <Col md="3">
                <label>TIME B</label>
                <Input
                  type="text"
                  value={currentData.team_b}
                  onChange={v => {
                    setData({
                      team_b: v.target.value
                    });
                  }}
                />
              </Col>
              <Col md="3">
                <label>PONTUAÇÃO</label>
                <select
                  type="select"
                  className="form-control"
                  value={currentData.score_type}
                  onChange={v => {
                    setData({
                      score_type: v.target.value
                    });
                  }}
                >
                  <option disabled selected></option>
                  <option value="RANKEADA">RANKEADA</option>
                  <option value="NAO_RANKEADA">NÃO RANKEADA</option>
                </select>
              </Col>
              <Col md="3">
                <label>TIPO</label>
                <select
                  type="select"
                  className="form-control"
                  value={currentData.type}
                  onChange={v => {
                    setData({
                      type: v.target.value
                    });
                  }}
                >
                  <option disabled selected></option>
                  <option value="PARTIDA_INTERNA">PARTIDA INTERNA</option>
                  <option value="PARDTIDA_EXTERNA">PARDTIDA EXTERNA</option>
                </select>
              </Col>
              <Col md="2">
                <label>MODALIDADE</label>
                <select
                  type="select"
                  className="form-control"
                  value={currentData.modality}
                  onChange={v => {
                    setData({
                      modality: v.target.value
                    });
                  }}
                >
                  <option disabled selected></option>
                  <option value="1_TEMPO">1 TEMPO</option>
                  <option value="2_TEMPO">2 TEMPOS</option>
                </select>
              </Col>
              <Col md="2">
                <label>DATA</label>
                <Input
                  type="date"
                  value={currentData.date}
                  onChange={v => {
                    setData({
                      date: v.target.value
                    });
                  }}
                />
              </Col>
              <Col md="2">
                <label>HORÁRIO DE INÍCIO</label>
                <Input
                  type="time"
                  value={currentData.time_start}
                  onChange={v => {
                    setData({
                      time_start: v.target.value
                    });
                  }}
                />
              </Col>
              <Col md="2">
                <label>HORÁRIO FINAL</label>
                <Input
                  type="time"
                  value={currentData.time_end}
                  onChange={v => {
                    setData({
                      time_end: v.target.value
                    });
                  }}
                />
              </Col>
              <Col md="2">
                <label>DURAÇÃO (MINUTOS)</label>
                <Input
                  type="number"
                  min={0}
                  value={currentData.duration}
                  onChange={v => {
                    setData({
                      duration: v.target.value
                    });
                  }}
                />
              </Col>
              <Col md="2">
                <label>JOGADORES POR TIME</label>
                <Input
                  type="number"
                  min={5}
                  max={11}
                  value={currentData.players_quantity}
                  onChange={v => {
                    setData({
                      players_quantity: v.target.value
                    });
                    setEscalation({
                      team_a: Array(parseInt(v.target.value)),
                      team_b: Array(parseInt(v.target.value))
                    });
                    setPlayers(currentData.players);
                  }}
                />
              </Col>
            </Row>
          </div>
        </CardBody>
      </Container>
    )
  );
};

const StepThree = ({ setModalStartMatchOpened }) => {
  return (
    <Container className="step-three-container">
      <CardHeader title="3º Passo - Opções" />
      <CardBody>
        <div className="step-three-btn-container">
          <button className="btn btn-save">
            <FaSave />
            {`SALVAR`}
          </button>
          <button className="btn btn-invite-players">
            <FaPaperPlane />
            {`CONVIDAR JOGADORES`}
          </button>
          <button
            className="btn btn-start"
            onClick={() => setModalStartMatchOpened(true)}
          >
            <FaFutbol />
            {`INICIAR PARTIDA`}
          </button>
        </div>
      </CardBody>
    </Container>
  );
};

const Footer = ({ onClickBack, onClickNext }) => {
  return (
    <div className="btn-container" onClick={onClickBack}>
      <Button className="btn btn-primary">
        <FaArrowLeft />
        {` Anterior`}
      </Button>
      <Button className="btn btn-primary" onClick={onClickNext}>
        {`Próximo `}
        <FaArrowRight />
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetails);
