import React, { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import { connect } from "react-redux";
import { CardBody } from "reactstrap";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";

import "./styles.css";
import Content from "./Content";
import EmptyState from "./EmptyState";
import ModalCreate from "./ModalCreate";
import CardHeader from "../../../components/CardHeader";
import Container from "../../../components/Container";
import StatuteActions from "../../../store/statute/statute.actions";
import SuggestionStatuteActions from "../../../store/suggestion_statute/suggestion_statute.actions";

const Statute = ({
  session,
  statute,
  fetchAction,
  createAction,
  updateAction,
  suggestion_statute,
  fetchSuggestionStatute,
}) => {
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState();

  useEffect(() => {
    fetchAction();
  }, []);

  useEffect(() => {
    if (!statute.data) {
      fetchSuggestionStatute();
    }
  }, [statute]);

  useEffect(() => {
    if (!statute.loading && modalCreateOpened && statute.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction();
      setCurrentData(null);
    } else if (!statute.loading && modalCreateOpened && statute.error !== "") {
      toast.error(statute.error);
    }
  }, [statute.loading]);

  useEffect(() => {
    if (statute.data && statute.data.description) {
      const dataJSON = JSON.parse(statute.data.description);
      setCurrentData(draftToHtml(dataJSON));
    }
  }, [statute.data]);

  function handleSubmitForm(evt, formData) {
    if (!formData.id) {
      createAction(formData);
    } else {
      updateAction(formData);
    }
    evt.preventDefault();
  }

  return (
    <Container loading={statute.loading} className="statute_suggestion">
      <CardHeader
        btnText="Editar"
        btnIcon={<FaRegEdit />}
        data={statute.data}
        setModalCreateOpened={statute.data && session.type === 'ORGANIZER' ? setModalCreateOpened : null}
      />
      <CardBody>
        {statute.data ? (
          <Content data={currentData} />
        ) : (
          <EmptyState setModalCreateOpened={setModalCreateOpened} session={session}/>
        )}
      </CardBody>
      {modalCreateOpened && (
        <ModalCreate
          data={
            statute.data
              ? statute.data
              : { suggestion: true, ...suggestion_statute.data }
          }
          opened={modalCreateOpened}
          createAction={createAction}
          updateAction={updateAction}
          setOpened={setModalCreateOpened}
          handleSubmitForm={handleSubmitForm}
        />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  statute: state.statute,
  session: state.session.data,
  suggestion_statute: state.suggestion_statute,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAction: (payload) => dispatch(StatuteActions.fetch(payload)),
  createAction: (payload) => dispatch(StatuteActions.create(payload)),
  updateAction: (payload) => dispatch(StatuteActions.update(payload)),
  fetchSuggestionStatute: (payload) =>
    dispatch(SuggestionStatuteActions.fetch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statute);
