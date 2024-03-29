import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../../components/Table";
import { formatPhone } from "../../../utils/Phone";
import CardHeader from "../../../components/CardHeader";
import AdminActions from "../../../store/admin/admin.actions";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const Admins = ({
  admin,
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
    fetchAction({ pageNumber });
  }, [pageNumber]);

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  useEffect(() => {
    if (!admin.loading && modalCreateOpened && admin.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    } else if (!admin.loading && modalCreateOpened && admin.error !== "") {
      toast.error(admin.error);
    } else if (!admin.loading && modalDeleteOpened && admin.error === "") {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    }
  }, [admin.loading]);

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
                title="Administradores"
              />
              <CardBody>
                <Table
                  setPageNumber={setPageNumber}
                  isLoading={admin.loading}
                  data={admin.data}
                  columns={[
                    { name: "Nome", attribute: "name" },
                    { name: "E-mail", attribute: "email" },
                    {
                      name: "Telefone",
                      render: ({ data }) => formatPhone(data.phone),
                    },
                    { name: "Status", attribute: "status" },
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
  admin: state.admin,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAction: (payload) => dispatch(AdminActions.fetch(payload)),
  createAction: (payload) => dispatch(AdminActions.create(payload)),
  updateAction: (payload) => dispatch(AdminActions.update(payload)),
  removeAction: (payload) => dispatch(AdminActions.remove(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
