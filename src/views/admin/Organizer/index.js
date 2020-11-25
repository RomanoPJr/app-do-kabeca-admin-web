import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaDoorOpen } from 'react-icons/fa'
import { ToastContainer, toast } from "react-toastify";
import { Card, CardBody, Col, Row } from "reactstrap";

import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../../components/Table";
import { formatPhone } from "../../../utils/Phone";
import CardHeader from "../../../components/CardHeader";
import EditButton from "../../../components/ActionButtons/EditButton";
import OrganizerActions from "../../../store/organizer/organizer.actions";
import SessionActions from "../../../store/session/session.actions";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const Organizer = ({
  session,
  organizer,
  fetchAction,
  updateAction,
  removeAction,
  fetchOrganizerSession
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const [modalDeleteOpened, setModalDeleteOpened] = useState(false);

  useEffect(() => {
    fetchAction({ type: "ADMIN", pageNumber });
  }, [pageNumber]);

  useEffect(() => {
    if (session.external) {
      window.location = '/club'
    }
  }, [session.external])

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  useEffect(() => {
    if (!organizer.loading && modalCreateOpened && organizer.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    } else if (
      !organizer.loading &&
      modalCreateOpened &&
      organizer.error !== ""
    ) {
      toast.error(organizer.error);
    } else if (
      !organizer.loading &&
      modalDeleteOpened &&
      organizer.error === ""
    ) {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    }
  }, [organizer.loading]);

  function handleSubmitForm(evt, formData) {
    updateAction(formData);
    evt.preventDefault();
  }

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
            <CardHeader title="Organizadores" />
            <CardBody>
              <Table
                setPageNumber={setPageNumber}
                isLoading={organizer.loading}
                data={organizer.data}
                columns={[
                  { name: "Nome", attribute: "name" },
                  {
                    name: "Telefone",
                    render: ({ data }) => formatPhone(data.phone),
                  },
                  { name: "E-mail", attribute: "email" },
                  {
                    name: "Plano", render: ({ data }) => {
                      if (data.Club) {
                        return `${data.Club.plan_type} Jogadores`
                      }
                      return "Sem Clube Config."
                    }
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
                        fetchOrganizerSession={fetchOrganizerSession}
                      />
                    ),
                  },
                ]}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
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
          setOpened={setModalDeleteOpened}
          removeAction={removeAction}
        />
      )}
      <ToastContainer />
    </div>
  );
};

const ActionColumn = ({
  data,
  setCurrentData,
  setModalDeleteOpened,
  setModalCreateOpened,
  fetchOrganizerSession
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
      <button className="btn btn-default btn-icon" style={{ marginLeft: 10 }} onClick={() => {
        fetchOrganizerSession({ user_id: data.id })
      }}>
        <FaDoorOpen />
      </button>
    </div>
  );

const mapStateToProps = (state) => ({
  organizer: state.organizer,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAction: (payload) => dispatch(OrganizerActions.fetch(payload)),
  updateAction: (payload) => dispatch(OrganizerActions.update(payload)),
  removeAction: (payload) => dispatch(OrganizerActions.remove(payload)),
  fetchOrganizerSession: (payload) => dispatch(SessionActions.fetchOrganizer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Organizer);
