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
import DeleteButton from "../../components/ActionButtons/DeleteButton";
import EditButton from "../../components/ActionButtons/EditButton";
import {
  fetchAdminsAction,
  createAdminAction,
  deleteAdminAction,
  updateAdminAction
} from "../../store/admin/admin.actions";

const Admins = ({
  fetchAdmins,
  admins,
  adminsIsLoading,
  createAdmin,
  createAdminLoading,
  createAdminError,
  updateAdmin,
  updateAdminError,
  updateAdminLoading,
  deleteAdmin,
  deleteAdminLoading
}) => {
  const [refreshData, setRefreshData] = useState(false);
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const [modalDeleteOpened, setModalDeleteOpened] = useState(false);
  const [currentData, setCurrentData] = useState({});
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
    if (
      !createAdminLoading &&
      !updateAdminLoading &&
      modalCreateOpened &&
      createAdminError === "" &&
      updateAdminError === ""
    ) {
      setModalCreateOpened(false);
      setRefreshData(!refreshData);
      showAlert({
        type: "success",
        message: "Registro salvo com sucesso!"
      });
    } else if (
      (!createAdminLoading || !updateAdminLoading) &&
      (createAdminError !== "" || updateAdminError !== "")
    ) {
      showAlert({
        type: "danger",
        message: "Email ou Telefone já existem, ou os dados são incompatíveis."
      });
    }
  }, [createAdminLoading, updateAdminLoading]);

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

  function handleOpenCreateModal() {
    setCurrentData({});
    setModalCreateOpened(true);
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
                  className="btn-fill btn btn-info"
                  onClick={() => handleOpenCreateModal(true)}
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
                  refreshData={refreshData}
                  fetchAction={fetchAdmins}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      {modalCreateOpened && (
        <ModalNewAdmin
          data={currentData}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          saveAction={createAdmin}
          updateAction={updateAdmin}
        />
      )}
      <ModalDelete
        data={currentData}
        opened={modalDeleteOpened}
        setOpened={setModalDeleteOpened}
        action={deleteAdmin}
      />
    </>
  );
};

const mapStateToProps = state => ({
  admins: state.admin.listAll,
  adminsError: state.admin.error,
  adminsIsLoading: state.admin.loading,
  createAdminError: state.admin.createAdminError,
  createAdminLoading: state.admin.createAdminLoading,
  updateAdminError: state.admin.updateAdminError,
  updateAdminLoading: state.admin.updateAdminLoading,
  deleteAdminLoading: state.admin.deleteAdminLoading
});

const mapDispatchToProps = dispatch => ({
  fetchAdmins: payload => dispatch(fetchAdminsAction(payload)),
  deleteAdmin: payload => dispatch(deleteAdminAction(payload)),
  updateAdmin: payload => dispatch(updateAdminAction(payload)),
  createAdmin: payload => dispatch(createAdminAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
