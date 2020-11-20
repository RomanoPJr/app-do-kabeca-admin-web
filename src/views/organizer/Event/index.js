import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBody, Badge, Row, Col, Card } from "reactstrap";
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
  session,
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
  const [fixedData, setFixedData] = useState();
  const [eventsData, setEventsData] = useState();

  useEffect(() => {
    fetchAction({ pageNumber });
  }, [pageNumber]);

  useEffect(() => {
    return () => {
      clearAction();
    };
  }, []);

  useEffect(() => {
    if (event.data && event.data.data) {
      const fixed = event.data.data.filter(data => {
        if (
          data.type === "VITORIA" ||
          data.type === "EMPATE" ||
          data.type === "DERROTA"
        ) {
          return data;
        }
      });
      setFixedData({ data: fixed });
      const dynamic = event.data.data.filter(data => {
        if (
          data.type !== "VITORIA" &&
          data.type !== "EMPATE" &&
          data.type !== "DERROTA"
        ) {
          return data;
        }
      });
      setEventsData({ ...event.data, data: dynamic });
    }
  }, [event.data]);

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

  const tableFixedColumns = [
    { name: "Evento", attribute: "description" },
    {
      name: "Pontos",
      render: ({ data }) => {
        if (!data.id) {
          return "";
        } else if (data.value < 0) {
          return (
            <Badge className="event-value-badge red">
              {data.value}
            </Badge>
          );
        } else {
          return (
            <Badge className="event-value-badge green">
              +{data.value}
            </Badge>
          );
        }
      }
    },
    {
      name: "Atualizado Em:",
      render: ({ data }) =>
        data.id
          ? moment(data.updatedAt).format("DD/MM/YYYY HH:mm")
          : ""
    },
  ]

  const tableEventsColumns = [
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
          <Badge className="event-value-badge red">
            {data.value}
          </Badge>
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
          <Badge className="event-value-badge red">
            {data.value}
          </Badge>
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
  ]

  if (session && session.type === 'ORGANIZER') {
    tableFixedColumns.push({
      name: <b className="action-column">Acões</b>,
      render: ({ data }) => (
        <ActionColumn
          data={data}
          setCurrentData={setCurrentData}
          setModalCreateOpened={setModalCreateOpened}
        />
      )
    })
    tableEventsColumns.push({
      name: <b className="action-column">Acões</b>,
      render: ({ data }) => (
        <ActionColumn
          data={data}
          setCurrentData={setCurrentData}
          setModalDeleteOpened={setModalDeleteOpened}
          setModalCreateOpened={setModalCreateOpened}
        />
      )
    })
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12" style={{ marginBottom: 25 }}>
            <Card>
              <CardHeader title="CRITÉRIOS DE PONTUAÇÃO FIXOS" />
              <CardBody>
                <Table
                  isLoading={event.loading}
                  data={fixedData}
                  columns={tableFixedColumns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12" style={{ marginBottom: 25 }}>
            <Card>
              <CardHeader
                {...session.type === 'ORGANIZER' ? { setModalCreateOpened: setModalCreateOpened } : {}}

                title="CRITÉRIOS DE PONTUAÇÃO PERSONALIZADOS (CRIE ATÉ 5 EVENTOS)"
              />
              <CardBody>
                <Table
                  setPageNumber={setPageNumber}
                  isLoading={event.loading}
                  data={eventsData}
                  columns={tableEventsColumns}
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
            </Card>
          </Col>
        </Row>
      </div>
    </>
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
      {setModalDeleteOpened && (
        <DeleteButton
          onClick={() => {
            setCurrentData(data);
            setModalDeleteOpened(true);
          }}
        />
      )}
    </div>
  );

const mapStateToProps = state => ({
  event: state.event,
  session: state.session.data,
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
