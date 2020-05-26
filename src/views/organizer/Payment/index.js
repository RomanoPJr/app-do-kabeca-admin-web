import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaDollarSign, } from "react-icons/fa";
import { Col, Row, Card, CardBody } from "reactstrap";

import Filter from "./Filter";
import Counters from "./Counters";
import CardHeader from "./CardHeader";
import ModalCreate from "./ModalCreate";
import Table from "../../../components/Table";
import { formatMoney } from "../../../utils/Currency";
import ClubActions from "../../../store/club/club.actions";
import PaymentActions from "../../../store/payment/payment.actions";

const Payment = ({
  club,
  player,
  payment,
  updateClub,
  fetchPlayer,
  clearAction,
  fetchAction,
  createAction,
  updateAction,
}) => {
  const [totalizers, setTotalizers] = useState();
  const [filterYear, setFilterYear] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [filterMonth, setFilterMonth] = useState();
  const [currentData, setCurrentData] = useState({});
  const [switchValue, setSwitchValue] = useState(false);
  const [modalCreateOpened, setModalCreateOpened] = useState(false);

  useEffect(() => {
    setPageNumber(1);
    setFilterYear(new Date().getFullYear());
    setFilterMonth(`${new Date().getMonth() + 1}`.padStart(2, "0"));

    return () => {
      clearAction();
    };
  }, []);

  useEffect(() => {
    if (club.data) {
      setSwitchValue(club.data.payment_module_view_type === 'ALL')
    }
  }, [club])

  useEffect(() => {
    handleFetch();
  }, [pageNumber, filterMonth, filterYear]);

  useEffect(() => {
    if (payment.data) {
      setTotalizers(payment.data.totalizers)
    }
  }, [payment])

  useEffect(() => {
    if (!modalCreateOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened]);

  useEffect(() => {
    if (!payment.loading && modalCreateOpened && payment.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      handleFetch();
      setCurrentData(null);
    } else if (!payment.loading && payment.error !== "") {
      toast.error(payment.error);
    }
  }, [payment.loading]);

  function handleFetch() {
    if (filterMonth && filterYear && filterYear.toString().length === 4) {
      fetchAction({ pageNumber, year: filterYear, month: filterMonth });
    }
  }

  function handleSubmitForm(evt, data) {
    if (!data.id) {
      createAction(data);
    } else {
      updateAction(data);
    }
    evt.preventDefault();
  }

  function handleSwicthChange(value) {
    updateClub({ ...club.data, payment_module_view_type: value ? 'ALL' : 'INDIVIDUAL' })
  }

  return (
    <div className="content">
      <Filter
        filterYear={filterYear}
        filterMonth={filterMonth}
        setFilterYear={setFilterYear}
        setFilterMonth={setFilterMonth}
      />
      <Row>
        <Col md="12">
          <Card>
            <CardHeader
              switchValue={switchValue}
              handleSwicthChange={handleSwicthChange}
            />
            <CardBody>
              <Counters totalizers={totalizers} />
              <Table
                setPageNumber={setPageNumber}
                isLoading={payment.loading}
                data={payment.data}
                columns={[
                  { name: "Nome", attribute: "User.name" },
                  {
                    name: "Valor a Receber",
                    render: ({ data }) => {
                      if (data.MonthlyPayments.length > 0) {
                        return formatMoney(data.MonthlyPayments[0].due_value);
                      }
                      return formatMoney(data.monthly_payment);
                    },
                  },
                  {
                    name: "Valor Recebido",
                    render: ({ data }) => {
                      if (
                        data.MonthlyPayments.length > 0 &&
                        data.MonthlyPayments[0].paid_value > 0
                      ) {
                        const value = formatMoney(
                          data.MonthlyPayments[0].paid_value
                        );
                        if (
                          data.MonthlyPayments[0].paid_value <
                          data.MonthlyPayments[0].due_value
                        ) {
                          return <p style={{ color: "red" }}>{value}</p>;
                        }
                        return value;
                      }
                      return <p style={{ color: "red" }}>{formatMoney(0)}</p>;
                    },
                  },
                  {
                    name: "",
                    render: ({ data }) => {
                      if (!(data.MonthlyPayments.length > 0)) {
                        return (
                          <p style={{ color: "yellow" }}>
                            Sem Registro de Pagamento
                          </p>
                        );
                      }
                    },
                  },
                  {
                    name: <b className="action-column">Registrar Pagamento</b>,
                    render: ({ data }) => (
                      <ActionColumn
                        data={data}
                        setCurrentData={setCurrentData}
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
          filterYear={filterYear}
          filterMonth={filterMonth}
          fetchPlayer={fetchPlayer}
          opened={modalCreateOpened}
          playerList={player.data.data}
          playerLoading={player.loading}
          confirmAction={handleSubmitForm}
          setOpened={setModalCreateOpened}
        />
      )}
      <ToastContainer />
    </div>
  );
};

const ActionColumn = ({ data, setCurrentData, setModalCreateOpened }) => (
  <div className="action-column">
    <button
      style={{ marginRight: 15 }}
      className="btn btn-default btn-icon"
      onClick={() => {
        setCurrentData(data);
        setModalCreateOpened(true);
      }}
    >
      <FaEdit />
    </button>
    <button
      className="btn btn-default btn-icon"
      onClick={() => {
        setCurrentData(data);
        setModalCreateOpened(true);
      }}
    >
      <FaDollarSign />
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  club: state.club,
  player: state.player,
  payment: state.payment,
});

const mapDispatchToProps = (dispatch) => ({
  clearAction: () => dispatch(PaymentActions.clear()),
  updateClub: (payload) => dispatch(ClubActions.update(payload)),
  fetchAction: (payload) => dispatch(PaymentActions.fetch(payload)),
  createAction: (payload) => dispatch(PaymentActions.create(payload)),
  updateAction: (payload) => dispatch(PaymentActions.update(payload)),
  removeAction: (payload) => dispatch(PaymentActions.remove(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
