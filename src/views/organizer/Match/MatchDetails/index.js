import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import "../styles.css";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import ModalEscalation from "./Modals/ModalEscalation";
import ModalEventRemove from "./Modals/ModalEventRemove";
import Container from "../../../../components/Container";
import ModalEscalationEdit from "./Modals/ModalEscalationEdit";
import MatchActions from "../../../../store/match/match.actions";
import EventActions from "../../../../store/event/event.actions";
import ModalEscalationRemove from "./Modals/ModalEscalationRemove";
import PlayerActions from "../../../../store/player/player.actions";
import ModalEscalationReplace from "./Modals/ModalEscalationReplace";
import MatchEventActions from "../../../../store/match_event/match_event.actions";
import MatchEscalationActions from "../../../../store/match_escalation/match_escalation.actions";
import ModalEdit from "./Modals/ModalEdit";
import ModalClone from "../ModalClone";

const MatchDetails = ({
  match,
  events,
  history,
  players,
  fetchOne,
  fetchEvents,
  fetchPlayers,
  matchDetails,
  updateMatch,
  createMatch,
  removeEscalation,
  createEscalation,
  updateEscalation,
  createMatchEvent,
  removeMatchEvent
}) => {
  const [modalStartMatchOpened, setModalStartMatchOpened] = useState(false);
  const [modalCreateOpened, setModalCreateOpened] = useState(false);

  const [activeTab, setActiveTab] = useState("1º TEMPO");
  const [currentPosition, setCurrentPosition] = useState();
  const [modalEditOpened, setModalEditOpened] = useState(false);
  const [modalCloneOpened, setModalCloneOpened] = useState(false);
  const [modalRemoveOpened, setModalRemoveOpened] = useState(false);
  const [modalEventsOpened, setModalEventsOpened] = useState(false);
  const [modalReplaceOpened, setModalReplaceOpened] = useState(false);
  const [modalEscalationOpened, setModalEscalationOpened] = useState(false);
  const [modalEventRemoveOpened, setModalEventRemoveOpened] = useState(false);

  useEffect(() => {
    loadMatchDetails();
  }, []);

  const loadMatchDetails = async () => {
    if (match.params && match.params.id) {
      await fetchOne(match.params.id);
    } else {
      history.replace("/organizer/matches");
    }
  };

  const handlePlayerClick = useCallback(async data => {
    setCurrentPosition(data);
    if (!data.escalation) {
      await fetchPlayers({
        match_id: match.params.id,
        round: data.round
      });
      setModalEscalationOpened(true);
    } else {
      await fetchEvents({
        match_id: match.params.id,
        round: data.round
      });
      setModalEditOpened(true);
    }
  }, []);

  const handleSelectPlayer = async player => {
    const escalation = {
      match_id: matchDetails.id,
      user_id: player.User.id,
      position: currentPosition.position,
      round: currentPosition.round,
      team: currentPosition.team
    };
    await createEscalation(escalation);
    setModalEscalationOpened(false);
    loadMatchDetails();
  };

  const handleReplaceOption = useCallback(async () => {
    await fetchPlayers({
      match_id: match.params.id,
      round: currentPosition.round
    });
    setModalReplaceOpened(true);
  });

  const handleRemoveOption = useCallback(() => {
    setModalRemoveOpened(true);
  });

  const handleGoalOption = useCallback(async () => {
    await createMatchEvent({
      type: "GOL",
      user_id: currentPosition.escalation.User.id,
      escalation_id: currentPosition.escalation.id,
      match_id: currentPosition.escalation.match_id
    });

    await loadMatchDetails();
    setModalEventsOpened(false);
    setModalEditOpened(false);
  });

  const handleEventAction = useCallback(async event => {
    await createMatchEvent({
      event_id: event.id,
      user_id: currentPosition.escalation.User.id,
      escalation_id: currentPosition.escalation.id,
      match_id: currentPosition.escalation.match_id
    });

    await loadMatchDetails();
    setModalEventsOpened(false);
    setModalEditOpened(false);
  });

  const handleReplaceAction = useCallback(async v => {
    await updateEscalation({
      id: currentPosition.escalation.id,
      replaced: v.id
    });

    await loadMatchDetails();
    setModalEditOpened(false);
    setModalReplaceOpened(false);
  });

  const handleDeleteAction = useCallback(async () => {
    await removeEscalation(currentPosition.escalation.id);
    setModalRemoveOpened(false);
    setModalEditOpened(false);
    fetchOne(match.params.id);
  });

  const onDeleteEventClick = useCallback(async id => {
    setCurrentPosition(id);
    setModalEventRemoveOpened(true);
  });

  const handleDeleteEventAction = useCallback(async id => {
    await removeMatchEvent(currentPosition);
    await loadMatchDetails();
    setModalEventRemoveOpened(false);
  });

  const handleExternalGoal = useCallback(async () => {
    await createMatchEvent({
      type: "GOL SOFRIDO",
      match_id: matchDetails.id
    });

    await loadMatchDetails();
    setModalEventsOpened(false);
    setModalEditOpened(false);
  });

  const handleStartTime = useCallback(async round => {
    await updateMatch({
      id: matchDetails.id,
      [round === "1º TEMPO" ? "timer_1" : "timer_2"]: new Date()
    });
    await loadMatchDetails();
  });

  const handleSubmitForm = async form => {
    await updateMatch(form);
    setModalCreateOpened(false);
    await loadMatchDetails();
  };

  const cloneMatchAction = async () => {
    const {
      date,
      duration,
      modality,
      players_quantity,
      score_type,
      type
    } = matchDetails;

    await createMatch({
      date,
      duration,
      modality,
      players_quantity,
      score_type,
      type,
      team_a: "TIME A",
      team_b: "TIME B"
    });
  };

  return (
    <>
      <Container className="super-container" loading={matchDetails === null}>
        <SectionOne
          setModalCloneOpened={setModalCloneOpened}
          setModalCreateOpened={setModalCreateOpened}
          setModalStartMatchOpened={setModalStartMatchOpened}
        />
        <SectionTwo
          activeTab={activeTab}
          matchDetails={matchDetails}
          setActiveTab={setActiveTab}
          handleStartTime={handleStartTime}
          handlePlayerClick={handlePlayerClick}
          onDeleteEventClick={onDeleteEventClick}
          handleExternalGoal={handleExternalGoal}
        />
      </Container>

      {/* EDIT MATCH */}
      {modalCreateOpened && (
        <ModalEdit
          data={matchDetails}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          confirmAction={handleSubmitForm}
        />
      )}

      {/* LIST ESCALED PLAYER OPTIONS */}
      {modalEditOpened && (
        <ModalEscalationEdit
          events={events}
          data={currentPosition}
          opened={modalEditOpened}
          setOpened={setModalEditOpened}
          handleGoalOption={handleGoalOption}
          handleEventAction={handleEventAction}
          handleRemoveOption={handleRemoveOption}
          handleReplaceOption={handleReplaceOption}
        />
      )}

      {/* LIST PLAYERS TO SUBSTITUTE */}
      {modalReplaceOpened && (
        <ModalEscalationReplace
          data={players}
          opened={modalReplaceOpened}
          setOpened={setModalReplaceOpened}
          handleReplaceAction={handleReplaceAction}
        />
      )}

      {/* REMOVE PLAYER */}
      {modalRemoveOpened && (
        <ModalEscalationRemove
          opened={modalRemoveOpened}
          setOpened={setModalRemoveOpened}
          handleDeleteAction={handleDeleteAction}
        />
      )}

      {/* LIST PLAYERS TO ESCALE */}
      {modalEscalationOpened && (
        <ModalEscalation
          data={players}
          opened={modalEscalationOpened}
          setOpened={setModalEscalationOpened}
          handleSelectPlayer={handleSelectPlayer}
        />
      )}
      {/* LIST PLAYERS TO ESCALE */}
      {modalCloneOpened && (
        <ModalClone
          opened={modalCloneOpened}
          setOpened={setModalCloneOpened}
          confirmAction={cloneMatchAction}
        />
      )}

      {/* START MATCH */}
      {/* {modalStartMatchOpened && (
        <ModalStartMatch
          data={players}
          opened={modalStartMatchOpened}
          setOpened={setModalStartMatchOpened}
          confirmAction={handleStartMatch}
        />
      )} */}

      {/* DELETE EVENT */}
      {modalEventRemoveOpened && (
        <ModalEventRemove
          confirmAction={handleDeleteEventAction}
          opened={modalEventRemoveOpened}
          setOpened={setModalEventRemoveOpened}
        />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  matchDetails: state.match.data,
  players: state.player.data,
  events: state.event.data
});

const mapDispatchToProps = dispatch => ({
  fetchOne: id => MatchActions.fetchOne(id),
  fetchEvents: () => EventActions.fetchAll(),
  createMatch: payload => MatchActions.create(payload),
  fetchPlayers: payload => PlayerActions.fetchAll(payload),
  removeEscalation: id => MatchEscalationActions.remove(id),
  createEscalation: payload => MatchEscalationActions.create(payload),
  createMatchEvent: payload => MatchEventActions.create(payload),
  removeMatchEvent: id => MatchEventActions.remove(id),
  updateEscalation: payload => MatchEscalationActions.update(payload),
  updateMatch: payload => MatchActions.update(payload)
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetails);
