import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../../components/Table";
import CardHeader from "../../../components/CardHeader";
import SponsorActions from "../../../store/sponsor/sponsor.actions";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const Sponsor = ({
  sponsor,
  fetchAction,
  createAction,
  updateAction,
  removeAction,
  clearAction,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();

  useEffect(() => {
    fetchAction({ pageNumber });
  }, [pageNumber]);

  useEffect(() => {
    if (!sponsor.loading && modalCreateOpened && sponsor.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    } else if (!sponsor.loading && sponsor.error !== "") {
      toast.error(sponsor.error);
    } else if (!sponsor.loading && modalDeleteOpened && sponsor.error === "") {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    }
  }, [sponsor.loading]);

  useEffect(() => {
    return () => {
      clearAction();
    };
  }, []);

  function handleSubmitForm(evt, data) {
    if (!data.id) {
      createAction(data);
    } else {
      updateAction(data);
    }
    evt.preventDefault();
  }

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader
              setModalCreateOpened={setModalCreateOpened}
              title="Patrocinadores (Cadastre até 6 patrocinadores)"
            />
            <CardBody>
              <Table
                setPageNumber={setPageNumber}
                isLoading={sponsor.loading}
                data={sponsor.data}
                columns={[
                  { name: "Patrocinador", attribute: "name" },
                  {
                    name: "Valor",
                    render: ({ data }) => <p>R$ {data.value}</p>,
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
      {modalCreateOpened && (
        <ModalCreate
          data={currentData}
          loading={sponsor.loading}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          confirmAction={handleSubmitForm}
        />
      )}
      {modalDeleteOpened && (
        <ModalDelete
          data={currentData}
          loading={sponsor.loading}
          opened={modalDeleteOpened}
          confirmAction={removeAction}
          setOpened={setModalDeleteOpened}
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
  sponsor: state.sponsor,
});

const mapDispatchToProps = (dispatch) => ({
  clearAction: () => dispatch(SponsorActions.clear()),
  fetchAction: (payload) => dispatch(SponsorActions.fetch(payload)),
  createAction: (payload) => dispatch(SponsorActions.create(payload)),
  updateAction: (payload) => dispatch(SponsorActions.update(payload)),
  removeAction: (payload) => dispatch(SponsorActions.remove(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor);
