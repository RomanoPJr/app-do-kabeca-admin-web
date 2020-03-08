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

import ModalNewAdmin from "./ModalNewAdmin";
import Table from "../../components/Table";
import {
  adminListAllAction,
  createAdminAction
} from "../../store/admin/admin.actions";

const Admins = ({
  fetchAdmins,
  admins,
  createAdmin,
  adminsIsLoading,
  adminsError
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalOpened, setModalOpened] = useState(true);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertText, setAlertText] = useState("Erro");

  useEffect(() => {
    fetchAdmins({ pageNumber, pageSize });
  }, [pageNumber]);

  useEffect(() => {
    if (adminsError !== "") {
      setAlertText("Email ou Telefone já existem.");
      setAlertIsOpen(true);
      setTimeout(() => {
        setAlertIsOpen(false);
      }, 5000);
    }
  }, [adminsError]);

  return (
    <>
      <Alert
        isOpen={alertIsOpen}
        color="warning"
        fade
        style={{ position: "absolute", right: 20, top: 20 }}
      >
        {alertText}
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
                  isLoading={adminsIsLoading}
                  columns={[
                    { name: "Nome", attribute: "firstname" },
                    { name: "Sobrenome", attribute: "lastname" },
                    { name: "E-mail", attribute: "email" },
                    { name: "Telefone", attribute: "phone" }
                  ]}
                  data={admins.data}
                  pageNumber={pageNumber}
                  pageTotal={admins.pageTotal}
                  pageSize={pageNumber}
                  setPageNumber={setPageNumber}
                  setPageSize={setPageSize}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <ModalNewAdmin
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        createAdmin={createAdmin}
      />
    </>
  );
};

const mapStateToProps = state => ({
  admins: state.admin.listAll,
  adminsError: state.admin.error,
  adminsIsLoading: state.admin.loading
});

const mapDispatchToProps = dispatch => ({
  fetchAdmins: payload => dispatch(adminListAllAction(payload)),
  createAdmin: payload => dispatch(createAdminAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
