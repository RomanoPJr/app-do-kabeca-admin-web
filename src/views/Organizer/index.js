import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, Card, CardBody, Col, Row } from "reactstrap";
import EditButton from "../../components/ActionButtons/EditButton";
import Table from "../../components/Table";
import organizerActions from "../../store/organizer/organizer.actions";
import Header from "./Header";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";

const Organizer = ({
  list,
  error,
  loading,
  fetchAction,
  createAction,
  updateAction,
  removeAction
}) => {
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
    fetchAction();
  }, []);

  useEffect(() => {
    if (!loading && error === "") {
      if (modalCreateOpened) {
        fetchAction();
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
        fetchAction();
        setModalDeleteOpened(false);
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
                isLoading={loading}
                fetchAction={fetchAction}
                data={{
                  data: list.data,
                  total: list.pageTotal
                }}
                columns={[
                  { name: "Nome", attribute: "name" },
                  { name: "Telefone", attribute: "phone" },
                  { name: "E-mail", attribute: "email" },
                  { name: "Status", attribute: "status" },
                  {
                    name: <b className="action-column">Acões</b>,
                    render: ({ data }) => (
                      <>
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
  list: state.organizer.list,
  error: state.organizer.error,
  loading: state.organizer.loading
});

const mapDispatchToProps = dispatch => ({
  fetchAction: payload => dispatch(organizerActions.fetch(payload)),
  createAction: payload => dispatch(organizerActions.create(payload)),
  updateAction: payload => dispatch(organizerActions.update(payload)),
  removeAction: payload => dispatch(organizerActions.remove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Organizer);
