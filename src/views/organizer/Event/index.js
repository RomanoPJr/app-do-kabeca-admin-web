import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBody, Badge } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";

import "./styles.css";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../../components/Table";
import Container from "../../../components/Container";
import CardHeader from "../../../components/CardHeader";
import EventActions from "../../../store/event/event.actions";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const Event = ({
  event,
  clearAction,
  fetchAction,
  createAction,
  updateAction,
  removeAction
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();

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
    } else if (!event.loading && modalDeleteOpened && event.error === "") {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    }
  }, [event.loading]);

  function handleSubmitForm(data) {
    if (!data.id) {
      createAction(data);
    } else {
      updateAction(data);
    }
  }

  return (
    <Container loading={event.loading}>
      <CardHeader
        setModalCreateOpened={setModalCreateOpened}
        title="CRITÉRIOS DE PONTUAÇÃO (Crie até 5 eventos)"
      />
      <CardBody>
        <Table
          setPageNumber={setPageNumber}
          isLoading={event.loading}
          data={event.data}
          columns={[
            {
              name: "",
              render: ({ data }) => {
                const size = {
                  width: 15,
                  height: 15,
                  borderRadius: 100
                };
                switch (data.type) {
                  case "EVENTO 1":
                    return (
                      <div
                        style={{
                          ...size,
                          backgroundColor: "yellow"
                        }}
                      />
                    );
                  case "EVENTO 2":
                    return (
                      <div
                        style={{
                          ...size,
                          backgroundColor: "red"
                        }}
                      />
                    );
                  case "EVENTO 3":
                    return (
                      <div
                        style={{
                          ...size,
                          backgroundColor: "blue"
                        }}
                      />
                    );
                  case "EVENTO 4":
                    return (
                      <div
                        style={{
                          ...size,
                          backgroundColor: "green"
                        }}
                      />
                    );
                  case "EVENTO 5":
                    return (
                      <div
                        style={{
                          ...size,
                          backgroundColor: "orange"
                        }}
                      />
                    );
                  default:
                    return <></>;
                }
                return data.value < 0 ? (
                  <Badge className="event-value-badge red">{data.value}</Badge>
                ) : (
                  <Badge className="event-value-badge green">
                    +{data.value}
                  </Badge>
                );
              }
            },
            { name: "Evento", attribute: "description" },
            {
              name: "Pontos",
              render: ({ data }) => {
                return data.value < 0 ? (
                  <Badge className="event-value-badge red">{data.value}</Badge>
                ) : (
                  <Badge className="event-value-badge green">
                    +{data.value}
                  </Badge>
                );
              }
            },
            {
              name: "Atualizado Em:",
              render: ({ data }) =>
                moment(data.updatedAt).format("DD/MM/YYYY HH:mm")
            },
            {
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  setCurrentData={setCurrentData}
                  setModalDeleteOpened={setModalDeleteOpened}
                  setModalCreateOpened={setModalCreateOpened}
                />
              )
            }
          ]}
        />
      </CardBody>
      {modalCreateOpened && (
        <ModalCreate
          data={currentData}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          handleSubmitForm={handleSubmitForm}
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
  setModalCreateOpened
}) => (
  <div className="action-column">
    <EditButton
      onClick={() => {
        setCurrentData(data);
        setModalCreateOpened(true);
      }}
    />
    <DeleteButton
      onClick={() => {
        setCurrentData(data);
        setModalDeleteOpened(true);
      }}
    />
  </div>
);

const mapStateToProps = state => ({
  event: state.event,
  suggestion_event: state.suggestion_event
});

const mapDispatchToProps = dispatch => ({
  clearAction: () => dispatch(EventActions.clear()),
  fetchAction: payload => dispatch(EventActions.fetch(payload)),
  createAction: payload => dispatch(EventActions.create(payload)),
  updateAction: payload => dispatch(EventActions.update(payload)),
  removeAction: payload => dispatch(EventActions.remove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
