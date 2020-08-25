import React from "react";
import { TabPane } from "reactstrap";
import Fields from "./Fields";
import TableEvents from "./TableEvents";
export default ({
  round,
  matchDetails,
  handlePlayerClick,
  onDeleteEventClick,
  handleExternalGoal
}) => {
  return (
    <TabPane tabId={round} style={{ paddingTop: 25 }}>
      <Fields
        round={round}
        matchDetails={matchDetails}
        handlePlayerClick={handlePlayerClick}
        handleExternalGoal={handleExternalGoal}
      />
      <TableEvents
        onDeleteEventClick={onDeleteEventClick}
        matchDetails={matchDetails}
      />
    </TabPane>
  );
};
