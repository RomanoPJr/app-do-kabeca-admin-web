import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  TabContent,
  Col,
  Row
} from "reactstrap";

import TabHeader from "./Tab/TabHeader";
import TabPane from "./Tab/TabPane";

export default ({
  activeTab,
  setActiveTab,
  matchDetails,
  handlePlayerClick,
  onDeleteEventClick,
  handleExternalGoal
}) => {
  const rounds = {
    round_1: "1º TEMPO",
    round_2: "2º TEMPO"
  };

  return (
    matchDetails && (
      <Card>
        <CardHeader title="DETALHES DA PARTIDA" />
        <CardBody>
          <Scoreboard />
          <Nav tabs>
            <TabHeader
              round={rounds.round_1}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {matchDetails.modality === "2 TEMPOS" && (
              <TabHeader
                round={rounds.round_2}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane
              round={rounds.round_1}
              matchDetails={matchDetails}
              handlePlayerClick={handlePlayerClick}
              playerQuantity={matchDetails.players_quantity}
              onDeleteEventClick={onDeleteEventClick}
              handleExternalGoal={handleExternalGoal}
            />
            {matchDetails.modality === "2 TEMPOS" && (
              <TabPane
                round={rounds.round_2}
                playerQuantity={matchDetails.players_quantity}
                matchDetails={matchDetails}
                handlePlayerClick={handlePlayerClick}
                onDeleteEventClick={onDeleteEventClick}
                handleExternalGoal={handleExternalGoal}
              />
            )}
          </TabContent>
        </CardBody>
      </Card>
    )
  );
};

const Scoreboard = () => {
  return (
    <Row>
      <Col
        md={12}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <p>PLACAR</p>
        <h1 style={{ fontSize: 55 }}>3x2</h1>
      </Col>
    </Row>
  );
};
