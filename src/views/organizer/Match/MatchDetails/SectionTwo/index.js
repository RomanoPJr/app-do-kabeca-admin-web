import React from "react";
import { Nav, TabContent } from "reactstrap";

import TabHeader from "./Tab/TabHeader";
import TabPane from "./Tab/TabPane";

export default ({
  session,
  activeTab,
  setActiveTab,
  matchDetails,
  handlePlayerClick,
  onDeleteEventClick,
  handleExternalGoal,
  handleStartTime
}) => {
  const rounds = {
    round_1: "1º TEMPO",
    round_2: "2º TEMPO"
  };

  return (
    matchDetails && (
      <>
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
            session={session}
            round={rounds.round_1}
            matchDetails={matchDetails}
            handlePlayerClick={handlePlayerClick}
            playerQuantity={matchDetails.players_quantity}
            onDeleteEventClick={onDeleteEventClick}
            handleExternalGoal={handleExternalGoal}
            handleStartTime={handleStartTime}
          />
          {matchDetails.modality === "2 TEMPOS" && (
            <TabPane
              session={session}
              round={rounds.round_2}
              playerQuantity={matchDetails.players_quantity}
              matchDetails={matchDetails}
              handlePlayerClick={handlePlayerClick}
              onDeleteEventClick={onDeleteEventClick}
              handleExternalGoal={handleExternalGoal}
              handleStartTime={handleStartTime}
            />
          )}
        </TabContent>
      </>
    )
  );
};
