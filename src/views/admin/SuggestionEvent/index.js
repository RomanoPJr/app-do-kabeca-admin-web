import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Col, Row, Badge } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

import "./styles.css";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../../components/Table";
import CardHeader from "../../../components/CardHeader";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";
import SuggestionEventActions from "../../../store/suggestion_event/suggestion_event.actions";

const SuggestionEvent = ({
  suggestion_event,
  fetchAction,
  createAction,
  updateAction,
  removeAction,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const [modalDeleteOpened, setModalDeleteOpened] = useState(false);

  useEffect(() => {
    fetchAction(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  useEffect(() => {
    if (
      !suggestion_event.loading &&
      modalCreateOpened &&
      suggestion_event.error === ""
    ) {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction(pageNumber);
      setCurrentData(null);
    } else if (
      !suggestion_event.loading &&
      modalCreateOpened &&
      suggestion_event.error !== ""
    ) {
      toast.error(suggestion_event.error);
    } else if (
      !suggestion_event.loading &&
      modalDeleteOpened &&
      suggestion_event.error === ""
    ) {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction(pageNumber);
      setCurrentData(null);
    }
  }, [suggestion_event.loading]);

  function handleSubmitForm(evt, formData) {
    if (!formData.id) {
      createAction(formData);
    } else {
      updateAction(formData);
    }
    evt.preventDefault();
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader
                setModalCreateOpened={setModalCreateOpened}
                title="Sugestões de Eventos"
              />
              <CardBody>
                <Table
                  data={suggestion_event.data}
                  setPageNumber={setPageNumber}
                  isLoading={suggestion_event.loading}
                  columns={[
                    { name: "Descrição", attribute: "description" },
                    {
                      name: "Valor",
                      render: ({ data }) => {
                        const sign = Math.sign(data.value);
                        return sign === -1 ? (
                          <Badge className="event-value-badge red">
                            {data.value}
                          </Badge>
                        ) : (
                          <Badge className="event-value-badge green">
                            +{data.value}
                          </Badge>
                        );
                      },
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
                      ),
                    },
                  ]}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      {modalCreateOpened && (
        <ModalCreate
          data={currentData}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          handleSubmitForm={handleSubmitForm}
        />
      )}
      <ModalDelete
        data={currentData}
        action={removeAction}
        opened={modalDeleteOpened}
        setOpened={setModalDeleteOpened}
      />
      <ToastContainer />
    </>
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
  suggestion_event: state.suggestion_event,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAction: (payload) => dispatch(SuggestionEventActions.fetch(payload)),
  createAction: (payload) => dispatch(SuggestionEventActions.create(payload)),
  updateAction: (payload) => dispatch(SuggestionEventActions.update(payload)),
  removeAction: (payload) => dispatch(SuggestionEventActions.remove(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionEvent);
