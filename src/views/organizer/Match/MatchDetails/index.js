import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import "../styles.css";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import ModalEvents from "./Modals/ModalEvents";
import ModalEscalation from "./Modals/ModalEscalation";
import Container from "../../../../components/Container";
import ModalEscalationEdit from "./Modals/ModalEscalationEdit";
import MatchActions from "../../../../store/match/match.actions";
import EventActions from "../../../../store/event/event.actions";
import ModalEscalationRemove from "./Modals/ModalEscalationRemove";
import PlayerActions from "../../../../store/player/player.actions";
import ModalEscalationReplace from "./Modals/ModalEscalationReplace";
import MatchEventActions from "../../../../store/match_event/match_event.actions";
import MatchEscalationActions from "../../../../store/match_escalation/match_escalation.actions";

const MatchDetails = ({
  match,
  events,
  history,
  players,
  fetchOne,
  fetchEvents,
  fetchPlayers,
  matchDetails,
  removeEscalation,
  createEscalation,
  updateEscalation,
  createMatchEvent
}) => {
  const [modalStartMatchOpened, setModalStartMatchOpened] = useState(false);
  const [modalCreateOpened, setModalCreateOpened] = useState(false);

  const [activeTab, setActiveTab] = useState("1º TEMPO");
  const [currentPosition, setCurrentPosition] = useState();
  const [modalEditOpened, setModalEditOpened] = useState(false);
  const [modalRemoveOpened, setModalRemoveOpened] = useState(false);
  const [modalEventsOpened, setModalEventsOpened] = useState(false);
  const [modalReplaceOpened, setModalReplaceOpened] = useState(false);
  const [modalEscalationOpened, setModalEscalationOpened] = useState(false);

  useEffect(() => {
    loadMatchDetails();
  }, []);

  //TODO: ORGANIZAR
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
      setModalEditOpened(true);
    }
  }, []);

  const handleSelectPlayer = async player => {
    const escalation = {
      match_id: matchDetails.id,
      user_id: player.id,
      position: currentPosition.position,
      round: currentPosition.round,
      team: currentPosition.team
    };
    await createEscalation(escalation);
    loadMatchDetails();
  };
  //TODO: ORGANIZAR

  const handleEventOption = useCallback(async () => {
    await fetchEvents();
    setModalEventsOpened(true);
  });

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

  const handleEventAction = useCallback(async event => {
    await createMatchEvent({
      description: event.description,
      value: event.value,
      user_id: currentPosition.escalation.User.id,
      event_id: event.id,
      match_id: currentPosition.escalation.match_id,
      escalation_id: currentPosition.escalation.id,
      type: event.type
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

  const handleDeleteEventAction = useCallback(async data => {
    console.log(data);
  });

  return (
    <>
      <Container className="super-container" loading={matchDetails === null}>
        <SectionOne
          setModalCreateOpened={setModalCreateOpened}
          setModalStartMatchOpened={setModalStartMatchOpened}
        />
        <SectionTwo
          activeTab={activeTab}
          matchDetails={matchDetails}
          setActiveTab={setActiveTab}
          handlePlayerClick={handlePlayerClick}
          handleDeleteEventAction={handleDeleteEventAction}
        />
      </Container>

      {/* EDIT MATCH */}
      {/* {modalCreateOpened && (
        <ModalCreate
          data={data}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          confirmAction={handleSubmitForm}
        />
      )} */}

      {/* LIST ESCALED PLAYER OPTIONS */}
      {modalEditOpened && (
        <ModalEscalationEdit
          data={currentPosition}
          opened={modalEditOpened}
          setOpened={setModalEditOpened}
          handleEventOption={handleEventOption}
          handleReplaceOption={handleReplaceOption}
          handleRemoveOption={handleRemoveOption}
        />
      )}

      {/* LIST EVENT */}
      {modalEventsOpened && (
        <ModalEvents
          events={events}
          opened={modalEventsOpened}
          setOpened={setModalEventsOpened}
          handleEventAction={handleEventAction}
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
      {/* {modalDeleteOpened && (
        <ModalDeleteEvent
          removeAction={() => {}}
          opened={modalDeleteOpened}
          data={currentModalDeleteData}
          setOpened={setModalDeleteOpened}
        />
      )} */}
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
  fetchPlayers: payload => PlayerActions.fetchAll(payload),
  removeEscalation: id => MatchEscalationActions.remove(id),
  createEscalation: payload => MatchEscalationActions.create(payload),
  createMatchEvent: payload => MatchEventActions.create(payload),
  updateEscalation: payload => MatchEscalationActions.update(payload)
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetails);