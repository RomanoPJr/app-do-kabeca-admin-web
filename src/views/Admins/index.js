import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaPlus } from "react-icons/fa";
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";

import ModalDelete from "./ModalDelete";
import ModalNewAdmin from "./ModalNewAdmin";
import Table from "../../components/Table";
import {
  fetchAdminsAction,
  createAdminAction,
  deleteAdminAction,
  updateAdminAction
} from "../../store/admin/admin.actions";

const Admins = ({
  fetchAdmins,
  createAdmin,
  deleteAdmin,
  updateAdmin,
  admins,
  adminsIsLoading,
  createAdminIsLoading,
  deleteAdminLoading,
  createAdminError
}) => {
  const [refreshData, setRefreshData] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalDeleteOpened, setModalDeleteOpened] = useState(false);
  const [modalAdmin, setModalAdmin] = useState({});
  const [alertConfig, setAlertConfig] = useState({
    type: "",
    message: "",
    opened: false
  });

  useEffect(() => {
    if (!deleteAdminLoading) {
      setRefreshData(!refreshData);
      setModalDeleteOpened(false);
    }
  }, [deleteAdminLoading]);
  useEffect(() => {
    if (!createAdminIsLoading && createAdminError === "" && modalOpened) {
      setModalOpened(false);
      setRefreshData(!refreshData);
      showAlert({
        type: "success",
        message: "Registro salvo com sucesso!"
      });
    } else if (!createAdminIsLoading && createAdminError !== "") {
      showAlert({
        type: "danger",
        message: "Email ou Telefone já existem, ou os dados são incompatíveis."
      });
    }
  }, [createAdminIsLoading, createAdminError]);

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

  return (
    <>
      <Alert
        isOpen={alertConfig.opened}
        color={alertConfig.type}
        fade
        style={{ position: "absolute", right: 20, top: 20, zIndex: 99999 }}
      >
        {alertConfig.message}
      </Alert>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="card-header-with-button">
                <CardTitle tag="h4">Administradores</CardTitle>
                <Button
                  className="btn-fill btn btn-primary"
                  onClick={() => setModalOpened(true)}
                >
                  <FaPlus />
                  {` Novo`}
                </Button>
              </CardHeader>
              <CardBody>
                <Table
                  data={{
                    data: admins.data,
                    total: admins.pageTotal
                  }}
                  isLoading={adminsIsLoading}
                  columns={[
                    { name: "Nome", attribute: "firstname" },
                    { name: "Sobrenome", attribute: "lastname" },
                    { name: "E-mail", attribute: "email" },
                    { name: "Telefone", attribute: "phone" }
                  ]}
                  fetchAction={fetchAdmins}
                  updateAction={updateAdmin}
                  refreshData={refreshData}
                  setModalOpened={setModalDeleteOpened}
                  setModalData={setModalAdmin}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <ModalNewAdmin
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        saveAction={createAdmin}
      />
      <ModalDelete
        modalOpened={modalDeleteOpened}
        setModalOpened={setModalDeleteOpened}
        action={() => deleteAdmin(modalAdmin.id)}
      />
    </>
  );
};

const mapStateToProps = state => ({
  admins: state.admin.listAll,
  adminsError: state.admin.error,
  adminsIsLoading: state.admin.loading,
  createAdminIsLoading: state.admin.createAdminLoading,
  deleteAdminLoading: state.admin.deleteAdminLoading,
  createAdminError: state.admin.createAdminError
});

const mapDispatchToProps = dispatch => ({
  fetchAdmins: payload => dispatch(fetchAdminsAction(payload)),
  deleteAdmin: payload => dispatch(deleteAdminAction(payload)),
  updateAdmin: payload => dispatch(updateAdminAction(payload)),
  createAdmin: payload => dispatch(createAdminAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
