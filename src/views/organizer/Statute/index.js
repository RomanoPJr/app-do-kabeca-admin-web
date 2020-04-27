import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Card, CardBody, Col, Row } from "reactstrap";

import "./styles.css";
import Content from "./Content";
import EmptyState from "./EmptyState";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import CardHeader from "../../../components/CardHeader";
import StatuteActions from "../../../store/statute/statute.actions";
import SuggestionStatuteActions from "../../../store/suggestion_statute/suggestion_statute.actions";

const Statute = ({
  statute,
  fetchAction,
  createAction,
  updateAction,
  removeAction,
  suggestion_statute,
  fetchSuggestionStatute,
}) => {
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();

  useEffect(() => {
    fetchAction();
  }, []);

  useEffect(() => {
    if (!statute.data) {
      fetchSuggestionStatute();
    }
  }, [statute]);

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  useEffect(() => {
    if (!statute.loading && modalCreateOpened && statute.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction();
      setCurrentData(null);
    } else if (!statute.loading && modalCreateOpened && statute.error !== "") {
      toast.error(statute.error);
    } else if (!statute.loading && modalDeleteOpened && statute.error === "") {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction();
      setCurrentData(null);
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
    <div className="content statute_suggestion">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader
              btnText="Editar"
              btnIcon={<FaRegEdit />}
              data={statute.data}
              setModalCreateOpened={statute.data ? setModalCreateOpened : null}
            />
            <CardBody>
              {statute.data ? (
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
      {modalDeleteOpened && (
        <ModalDelete
          opened={modalDeleteOpened}
          removeAction={removeAction}
          data={statute.data}
          setOpened={setModalDeleteOpened}
        />
      )}
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  statute: state.statute,
  suggestion_statute: state.suggestion_statute,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAction: (payload) => dispatch(StatuteActions.fetch(payload)),
  createAction: (payload) => dispatch(StatuteActions.create(payload)),
  updateAction: (payload) => dispatch(StatuteActions.update(payload)),
  removeAction: (payload) => dispatch(StatuteActions.remove(payload)),
  fetchSuggestionStatute: (payload) =>
    dispatch(SuggestionStatuteActions.fetch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statute);
