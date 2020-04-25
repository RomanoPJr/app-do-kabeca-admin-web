import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, Card, CardBody, Col, Row } from "reactstrap";

import Header from "./Header";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../components/Table";
import userActions from "../../store/user/user.actions";
import EditButton from "../../components/ActionButtons/EditButton";
import DeleteButton from "../../components/ActionButtons/DeleteButton";

const Admins = ({
  list,
  error,
  loading,
  fetchAction,
  createAction,
  updateAction,
  deleteAction
}) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const [modalDeleteOpened, setModalDeleteOpened] = useState(false);
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
    fetchAction({ type: "ADMIN", pageNumber, pageSize });
  }, [pageNumber]);

  useEffect(() => {
    if (!loading && error === "") {
      if (modalCreateOpened) {
        fetchAction({ type: "ADMIN", pageNumber, pageSize });
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
        fetchAction({ type: "ADMIN", pageNumber, pageSize });
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
        message: error.message
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
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <Header
                setModalCreateOpened={setModalCreateOpened}
                setModalDeleteOpened={setModalDeleteOpened}
              />
              <CardBody>
                <Table
                  setPageNumber={setPageNumber}
                  isLoading={loading}
                  data={list}
                  columns={[
                    { name: "Nome", attribute: "name" },
                    { name: "E-mail", attribute: "email" },
                    { name: "Telefone", attribute: "phone" },
                    {
                      name: "Status",
                      render: ({ data }) => {
                        var status = "";
                        switch (data.status) {
                          case "ACTIVE":
                            status = "ATIVO";
                            break;
                          case "INACTIVE":
                            status = "INATIVO";
                            break;
                          case "TESTER":
                            status = "TESTE";
                            break;
                          default:
                            break;
                        }
                        return status;
                      }
                    },
                    {
                      name: "Acões",
                      render: ({ data }) => {
                        return (
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
                        );
                      }
                    }
                  ]}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
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
          data={currentData}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          createAction={createAction}
          updateAction={updateAction}
        />
      )}
      <ModalDelete
        data={currentData}
        opened={modalDeleteOpened}
        setOpened={setModalDeleteOpened}
        action={deleteAction}
      />
    </>
  );
};

const mapStateToProps = state => ({
  list: state.user.list,
  error: state.user.error,
  loading: state.user.loading
});

const mapDispatchToProps = dispatch => ({
  fetchAction: payload => dispatch(userActions.fetch(payload)),
  createAction: payload => dispatch(userActions.create(payload)),
  updateAction: payload => dispatch(userActions.update(payload)),
  deleteAction: payload => dispatch(userActions.remove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
