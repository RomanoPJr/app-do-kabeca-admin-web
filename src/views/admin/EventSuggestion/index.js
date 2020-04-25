import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, Card, CardBody, Col, Row } from "reactstrap";

import Header from "./Header";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../components/Table";
import EditButton from "../../components/ActionButtons/EditButton";
import DeleteButton from "../../components/ActionButtons/DeleteButton";
import eventSuggestionActions from "../../store/eventSuggestion/eventSuggestion.actions";

const EventSuggestion = ({
  list,
  error,
  loading,
  fetchAction,
  createAction,
  updateAction,
  removeAction
}) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();
  const [currentData, setCurrentData] = useState({});
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

  useEffect(() => {
    fetchAction({ pageNumber, pageSize });
  }, [pageNumber]);

  useEffect(() => {
    if (!loading && error === "") {
      if (modalCreateOpened) {
        fetchAction({ pageNumber, pageSize });
        setModalCreateOpened(false);
        if (currentData.id) {
          showAlert({
            type: "success",
            message: "Registro Alterado com Sucesso"
          });
        } else {
          showAlert({
            type: "success",
            message: "Registro Salvo com Sucesso"
          });
        }
      } else if (modalDeleteOpened) {
        fetchAction({ pageNumber, pageSize });
        setModalDeleteOpened(false);
        setCurrentData({});
        showAlert({
          type: "success",
          message: "Registro Excluído com Sucesso"
        });
      }
    }
  }, [loading]);

  useEffect(() => {
    if (error !== "" && !loading && modalCreateOpened) {
      showAlert({
        type: "danger",
        message: error
      });
    } else if (error !== "" && !loading && modalDeleteOpened) {
      showAlert({
        type: "danger",
        message: "Erro ao deletar o registro"
      });
    }
  }, [error]);

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  return (
    <div className="content event_suggestion">
      <Row>
        <Col md="12">
          <Card>
            <Header
              listLength={list.length}
              setModalCreateOpened={setModalCreateOpened}
              setModalDeleteOpened={setModalDeleteOpened}
            />
            <CardBody>
              <Table
                setPageNumber={setPageNumber}
                isLoading={loading}
                data={list}
                columns={[
                  { name: "Descrição", attribute: "description" },
                  { name: "Valor", attribute: "value" },
                  {
                    name: <b className="action-column">Acões</b>,
                    render: ({ data }) => (
                      <>
                        <DeleteButton
                          onClick={() => {
                            setCurrentData(data);
                            setModalDeleteOpened(true);
                          }}
                        />
                        <EditButton
                          onClick={() => {
                            setCurrentData(data);
                            setModalCreateOpened(true);
                          }}
                        />
                      </>
                    )
                  }
                ]}
              />
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
          data={currentData}
        />
      )}
      {modalDeleteOpened && (
        <ModalDelete
          opened={modalDeleteOpened}
          setOpened={setModalDeleteOpened}
          removeAction={removeAction}
          data={currentData}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  list: state.eventSuggestion.list,
  error: state.eventSuggestion.error,
  loading: state.eventSuggestion.loading
});

const mapDispatchToProps = dispatch => ({
  fetchAction: payload => dispatch(eventSuggestionActions.fetch(payload)),
  createAction: payload => dispatch(eventSuggestionActions.create(payload)),
  updateAction: payload => dispatch(eventSuggestionActions.update(payload)),
  removeAction: payload => dispatch(eventSuggestionActions.remove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventSuggestion);