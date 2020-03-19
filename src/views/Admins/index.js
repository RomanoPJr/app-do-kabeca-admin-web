import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, Card, CardBody, Col, Row } from "reactstrap";

import Header from "./Header";
import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../components/Table";
import adminActions from "../../store/admin/admin.actions";
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
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const [modalDeleteOpened, setModalDeleteOpened] = useState(false);
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
                    { name: "Nome", attribute: "firstname" },
                    { name: "Sobrenome", attribute: "lastname" },
                    { name: "E-mail", attribute: "email" },
                    { name: "Telefone", attribute: "phone" },
                    {
                      name: <b className="action-column">Acões</b>,
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
          saveAction={createAction}
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
  list: state.admin.list,
  error: state.admin.error,
  loading: state.admin.loading
});

const mapDispatchToProps = dispatch => ({
  fetchAction: payload => dispatch(adminActions.fetch(payload)),
  createAction: payload => dispatch(adminActions.create(payload)),
  updateAction: payload => dispatch(adminActions.update(payload)),
  deleteAction: payload => dispatch(adminActions.remove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
