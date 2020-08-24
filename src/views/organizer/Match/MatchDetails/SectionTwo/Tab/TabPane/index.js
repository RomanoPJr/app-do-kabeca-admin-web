import React from "react";
import { TabPane } from "reactstrap";
import Fields from "./Fields";
import TableEvents from "./TableEvents";
export default ({
  round,
  matchDetails,
  handlePlayerClick,
  handleDeleteEventAction
}) => {
  return (
    <TabPane tabId={round} style={{ paddingTop: 25 }}>
      <Fields
        round={round}
        matchDetails={matchDetails}
        handlePlayerClick={handlePlayerClick}
      />
      <TableEvents
        handleDeleteEventAction={handleDeleteEventAction}
        matchDetails={matchDetails}
      />
    </TabPane>
  );
};
