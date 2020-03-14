import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, Card, CardBody, Col, Row } from "reactstrap";
import statuteSuggestionActions from "../../store/statuteSuggestion/statuteSuggestion.actions";
import Content from "./Content";
import EmptyState from "./EmptyState";
import Header from "./Header";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import "./styles.css";

const StatuteSuggestion = ({
  fetchAction,
  createAction,
  updateAction,
  removeAction,
  list,
  error,
  loading
}) => {
  const [statuteSuggestion, setStatuteSuggestion] = useState();
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();
  const [data, setData] = useState({});
  const [alertConfig, setAlertConfig] = useState({
    type: "",
    message: "",
    opened: false
  });

  function showAlert({ type, message }) {
    setAlertConfig({
      type,
      message,
      opened: true
    });
    setTimeout(() => {
      setAlertConfig({ ...alertConfig, opened: false });
    }, 5000);
  }

  function formatData(data) {
    if (data.description) {
      const dataJSON = JSON.parse(data.description);
      const dataHTML = draftToHtml(dataJSON);
      setStatuteSuggestion(dataHTML);
    }
  }

  useEffect(() => {
    fetchAction();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      setData(list[0]);
    } else {
      setData({});
    }

    if (modalCreateOpened && error === "") {
      setModalCreateOpened(false);
      showAlert({
        type: "success",
        message: "Registro Alterado com Sucesso"
      });
    } else if (modalDeleteOpened && error === "") {
      setModalDeleteOpened(false);
      showAlert({
        type: "success",
        message: "Registro Excluído com Sucesso"
      });
    }
  }, [list]);

  useEffect(() => {
    formatData(data);
  }, [data]);

  useEffect(() => {
    if (error !== "" && !loading && modalCreateOpened) {
      showAlert({
        type: "danger",
        message: "Erro ao alterar o registro"
      });
    } else if (error !== "" && !loading && modalDeleteOpened) {
      showAlert({
        type: "danger",
        message: "Erro ao deletar o registro"
      });
    }
  }, [error]);

  return (
    <div className="content statute_suggestion">
      <Row>
        <Col md="12">
          <Card>
            <Header
              listLength={list.length}
              setModalCreateOpened={setModalCreateOpened}
              setModalDeleteOpened={setModalDeleteOpened}
            />
            <CardBody>
              {list.length > 0 ? (
                <Content list={statuteSuggestion} />
              ) : (
                <EmptyState setModalCreateOpened={setModalCreateOpened} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Alert
        isOpen={alertConfig.opened}
        color={alertConfig.type}
        fade
        style={{ position: "absolute", right: 20, top: 20, zIndex: 99999 }}
      >
        {alertConfig.message}
      </Alert>
      {modalCreateOpened && (
        <ModalCreate
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          createAction={createAction}
          updateAction={updateAction}
          data={data}
        />
      )}
      {modalDeleteOpened && (
        <ModalDelete
          opened={modalDeleteOpened}
          setOpened={setModalDeleteOpened}
          removeAction={removeAction}
          data={data}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  list: state.statuteSuggestion.list,
  error: state.statuteSuggestion.error,
  loading: state.statuteSuggestion.loading
  // createAdminError: state.admin.createAdminError,
  // createAdminLoading: state.admin.createAdminLoading,
  // updateAdminError: state.admin.updateAdminError,
  // updateAdminLoading: state.admin.updateAdminLoading,
  // deleteAdminLoading: state.admin.deleteAdminLoading
});

const mapDispatchToProps = dispatch => ({
  fetchAction: payload => dispatch(statuteSuggestionActions.fetch(payload)),
  createAction: payload => dispatch(statuteSuggestionActions.create(payload)),
  updateAction: payload => dispatch(statuteSuggestionActions.update(payload)),
  removeAction: payload => dispatch(statuteSuggestionActions.remove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatuteSuggestion);
