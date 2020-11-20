import React from "react";
import { TabPane } from "reactstrap";
import Fields from "./Fields";
import TableEvents from "./TableEvents";
export default ({
  round,
  session,
  matchDetails,
  handlePlayerClick,
  onDeleteEventClick,
  handleExternalGoal,
  handleStartTime
}) => {
  return (
    <TabPane tabId={round} style={{ paddingTop: 25 }}>
      <Fields
        round={round}
        matchDetails={matchDetails}
        handlePlayerClick={handlePlayerClick}
        handleExternalGoal={handleExternalGoal}
        handleStartTime={handleStartTime}
      />
      <TableEvents
        session={session}
        onDeleteEventClick={onDeleteEventClick}
        matchDetails={matchDetails}
      />
    </TabPane>
  );
};
