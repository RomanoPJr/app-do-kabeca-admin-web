import React from "react";
import { Card, CardHeader, CardBody, Nav, TabContent } from "reactstrap";

import TabHeader from "./Tab/TabHeader";
import TabPane from "./Tab/TabPane";

export default ({
  activeTab,
  setActiveTab,
  matchDetails,
  handlePlayerClick,
  handleDeleteEventAction
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
              handleDeleteEventAction={handleDeleteEventAction}
            />
            {matchDetails.modality === "2 TEMPOS" && (
              <TabPane
                round={rounds.round_2}
                playerQuantity={matchDetails.players_quantity}
                matchDetails={matchDetails}
                handlePlayerClick={handlePlayerClick}
                handleDeleteEventAction={handleDeleteEventAction}
              />
            )}
          </TabContent>
        </CardBody>
      </Card>
    )
  );
};
