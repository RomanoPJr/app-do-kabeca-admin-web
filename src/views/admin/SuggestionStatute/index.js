import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardBody, Col, Row } from "reactstrap";

import "./styles.css";
import Header from "./Header";
import Content from "./Content";
import EmptyState from "./EmptyState";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import SuggestionStatuteActions from "../../../store/suggestion_statute/suggestion_statute.actions";

const SuggestionStatute = ({
  fetchAction,
  createAction,
  updateAction,
  removeAction,
  suggestion_statute,
}) => {
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();

  useEffect(() => {
    fetchAction();
  }, []);

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  useEffect(() => {
    if (
      !suggestion_statute.loading &&
      modalCreateOpened &&
      suggestion_statute.error === ""
    ) {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction();
      setCurrentData(null);
    } else if (
      !suggestion_statute.loading &&
      modalCreateOpened &&
      suggestion_statute.error !== ""
    ) {
      toast.error(suggestion_statute.error);
    } else if (
      !suggestion_statute.loading &&
      modalDeleteOpened &&
      suggestion_statute.error === ""
    ) {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction();
      setCurrentData(null);
    }
  }, [suggestion_statute.loading]);

  useEffect(() => {
    if (suggestion_statute.data && suggestion_statute.data.description) {
      const dataJSON = JSON.parse(suggestion_statute.data.description);
      setCurrentData(draftToHtml(dataJSON));
    }
  }, [suggestion_statute.data]);

  function handleSubmitForm(evt, formData, editorState) {
    let description = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    if (!formData.id) {
      createAction({ description });
    } else {
      updateAction({ id: formData.id, description });
    }
    evt.preventDefault();
  }

  return (
    <div className="content statute_suggestion">
      <Row>
        <Col md="12">
          <Card>
            <Header
              data={suggestion_statute.data}
              setModalCreateOpened={setModalCreateOpened}
              setModalDeleteOpened={setModalDeleteOpened}
            />
            <CardBody>
              {suggestion_statute.data ? (
                <Content data={currentData} />
              ) : (
                <EmptyState setModalCreateOpened={setModalCreateOpened} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {modalCreateOpened && (
        <ModalCreate
          opened={modalCreateOpened}
          createAction={createAction}
          updateAction={updateAction}
          data={suggestion_statute.data}
          setOpened={setModalCreateOpened}
          handleSubmitForm={handleSubmitForm}
        />
      )}
      {modalDeleteOpened && (
        <ModalDelete
          opened={modalDeleteOpened}
          removeAction={removeAction}
          data={suggestion_statute.data}
          setOpened={setModalDeleteOpened}
        />
      )}
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  suggestion_statute: state.suggestion_statute,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAction: (payload) => dispatch(SuggestionStatuteActions.fetch(payload)),
  createAction: (payload) => dispatch(SuggestionStatuteActions.create(payload)),
  updateAction: (payload) => dispatch(SuggestionStatuteActions.update(payload)),
  removeAction: (payload) => dispatch(SuggestionStatuteActions.remove(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionStatute);
