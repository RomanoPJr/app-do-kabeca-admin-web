import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Card, CardBody, Col, Row } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../../components/Table";
import CardHeader from "../../../components/CardHeader";
import PlayerActions from "../../../store/player/player.actions";
import PaymentActions from "../../../store/payment/payment.actions";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const Payment = ({
  player,
  payment,
  clearAction,
  fetchAction,
  createAction,
  updateAction,
  removeAction,
  fetchPlayer,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const [modalDeleteOpened, setModalDeleteOpened] = useState(false);

  useEffect(() => {
    fetchAction({ pageNumber });
  }, [pageNumber]);

  useEffect(() => {
    return () => {
      clearAction();
    };
  }, []);

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  useEffect(() => {
    if (!payment.loading && modalCreateOpened && payment.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    } else if (!payment.loading && payment.error !== "") {
      toast.error(payment.error);
    } else if (!payment.loading && modalDeleteOpened && payment.error === "") {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    }
  }, [payment.loading]);

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
              title="Mensalidades"
            />
            <CardBody>
              <Table
                setPageNumber={setPageNumber}
                isLoading={payment.loading}
                data={payment.data}
                columns={[
                  { name: "Nome", attribute: "User.name" },
                  {
                    name: "Valor",
                    render: ({ data }) => `R$ ${data.value}`,
                  },
                  {
                    name: "Referente",
                    render: ({ data }) =>
                      moment(data.referent).format("DD/MM/YYYY"),
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
      {modalCreateOpened && (
        <ModalCreate
          data={currentData}
          playerList={player.data.data}
          playerLoading={player.loading}
          opened={modalCreateOpened}
          fetchPlayer={fetchPlayer}
          setOpened={setModalCreateOpened}
          confirmAction={handleSubmitForm}
        />
      )}
      {modalDeleteOpened && (
        <ModalDelete
          data={currentData}
          loading={payment.loading}
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
  player: state.player,
  payment: state.payment,
});

const mapDispatchToProps = (dispatch) => ({
  clearAction: () => dispatch(PaymentActions.clear()),
  fetchAction: (payload) => dispatch(PaymentActions.fetch(payload)),
  createAction: (payload) => dispatch(PaymentActions.create(payload)),
  updateAction: (payload) => dispatch(PaymentActions.update(payload)),
  removeAction: (payload) => dispatch(PaymentActions.remove(payload)),
  fetchPlayer: (payload) => dispatch(PlayerActions.fetch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
