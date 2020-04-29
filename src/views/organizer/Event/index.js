import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBody } from "reactstrap";
import { toast } from "react-toastify";

import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../../components/Table";
import Container from "../../../components/Container";
import CardHeader from "../../../components/CardHeader";
import EventActions from "../../../store/event/event.actions";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";
import SuggestionEventActions from "../../../store/suggestion_event/suggestion_event.actions";

const Event = ({
  event,
  clearAction,
  fetchAction,
  createAction,
  updateAction,
  removeAction,
  suggestion_event,
  fetchSuggestionEvent,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();

  useEffect(() => {
    fetchSuggestionEvent();
  }, []);

  useEffect(() => {
    fetchAction({ pageNumber });
  }, [pageNumber]);

  useEffect(() => {
    return () => {
      clearAction();
    };
  }, []);

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  useEffect(() => {
    if (!event.loading && modalCreateOpened && event.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    } else if (!event.loading && event.error !== "") {
      toast.error(event.error);
    } else if (!suggestion_event.loading && event.error !== "") {
      toast.error(event.error);
    } else if (!event.loading && modalDeleteOpened && event.error === "") {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    }
  }, [event.loading]);

  function handleSubmitForm(evt, data) {
    if (!data.id) {
      createAction(data);
    } else {
      updateAction(data);
    }
    evt.preventDefault();
  }

  return (
    <Container loading={event.loading}>
      <CardHeader
        setModalCreateOpened={setModalCreateOpened}
        title="Eventos de Partida (Crie até 10 eventos)"
      />
      <CardBody>
        <Table
          setPageNumber={setPageNumber}
          isLoading={event.loading}
          data={event.data}
          columns={[
            { name: "Evento", attribute: "description" },
            { name: "Valor", attribute: "value" },
            {
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  setCurrentData={setCurrentData}
                  setModalDeleteOpened={setModalDeleteOpened}
                  setModalCreateOpened={setModalCreateOpened}
                />
              ),
            },
          ]}
        />
      </CardBody>
      {modalCreateOpened && (
        <ModalCreate
          data={currentData}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          handleSubmitForm={handleSubmitForm}
          suggestion_event={suggestion_event.data}
        />
      )}
      {modalDeleteOpened && (
        <ModalDelete
          data={currentData}
          opened={modalDeleteOpened}
          removeAction={removeAction}
          setOpened={setModalDeleteOpened}
        />
      )}
    </Container>
  );
};

const ActionColumn = ({
  data,
  setCurrentData,
  setModalDeleteOpened,
  setModalCreateOpened,
}) => (
  <div className="action-column">
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
  </div>
);

const mapStateToProps = (state) => ({
  event: state.event,
  suggestion_event: state.suggestion_event,
});

const mapDispatchToProps = (dispatch) => ({
  clearAction: () => dispatch(EventActions.clear()),
  fetchAction: (payload) => dispatch(EventActions.fetch(payload)),
  createAction: (payload) => dispatch(EventActions.create(payload)),
  updateAction: (payload) => dispatch(EventActions.update(payload)),
  removeAction: (payload) => dispatch(EventActions.remove(payload)),
  fetchSuggestionEvent: (payload) =>
    dispatch(SuggestionEventActions.all(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
