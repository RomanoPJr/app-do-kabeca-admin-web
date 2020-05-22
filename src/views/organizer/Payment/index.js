import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  FaUserMinus,
  FaEdit,
  FaDollarSign,
  FaHandHoldingUsd,
} from "react-icons/fa";
import {
  Col,
  Row,
  Card,
  Input,
  Label,
  CardBody,
  CardTitle,
  FormGroup,
  CardHeader as CardH,
} from "reactstrap";

import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../../components/Table";
import CardHeader from "../../../components/CardHeader";
import { formatMoney } from "../../../utils/Currency";
import PaymentActions from "../../../store/payment/payment.actions";

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
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [filterMonth, setFilterMonth] = useState(
    `${new Date().getMonth() + 1}`.padStart(2, "0")
  );

  useEffect(() => {
    return () => {
      clearAction();
    };
  }, []);

  useEffect(() => {
    handleFetch();
  }, [pageNumber, filterMonth, filterYear]);

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  useEffect(() => {
    if (!payment.loading && modalCreateOpened && payment.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      handleFetch();
      setCurrentData(null);
    } else if (!payment.loading && payment.error !== "") {
      toast.error(payment.error);
    } else if (!payment.loading && modalDeleteOpened && payment.error === "") {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      handleFetch();
      setCurrentData(null);
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

  return (
    <div className="content">
      <Row>
        <Col lg="12">
          <Card>
            <CardH>
              <h5 className="card-category">Filtros</h5>
            </CardH>
            <CardBody>
              <Row style={{ alignItems: "baseline" }}>
                <Col lg="6">
                  <FormGroup>
                    <Label>Mês</Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect1"
                      placeholder="Mês"
                      value={filterMonth || ""}
                      onChange={(event) => {
                        setFilterMonth(event.target.value);
                      }}
                    >
                      <option value="01">JANEIRO</option>
                      <option value="02">FEVEREIRO</option>
                      <option value="03">MARÇO</option>
                      <option value="04">ABRIL</option>
                      <option value="05">MAIO</option>
                      <option value="06">JUNHO</option>
                      <option value="07">JULHO</option>
                      <option value="08">AGOSTO</option>
                      <option value="09">SETEMBRO</option>
                      <option value="10">OUTUBRO</option>
                      <option value="11">NOVEMBRO</option>
                      <option value="12">DEZEMBRO</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label>Ano</Label>
                    <Input
                      required
                      value={filterYear || ""}
                      placeholder="Ano"
                      type="number"
                      min="2020"
                      onChange={(event) => {
                        setFilterYear(event.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader title="Financeiro" />
            <CardBody>
              <Row>
                <Col lg="4">
                  <Card className="card-chart">
                    <CardH>
                      <h5 className="card-category">Total a Receber</h5>
                      <CardTitle tag="h3">
                        <FaDollarSign style={{ marginRight: 15 }} />
                        {formatMoney(
                          payment.data.totalizers
                            ? payment.data.totalizers.totalReceivable
                            : 0
                        )}
                      </CardTitle>
                    </CardH>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-chart">
                    <CardH>
                      <h5 className="card-category">Total Recebido</h5>
                      <CardTitle tag="h3">
                        <FaHandHoldingUsd style={{ marginRight: 15 }} />
                        {formatMoney(
                          payment.data.totalizers
                            ? payment.data.totalizers.totalReceived
                            : 0
                        )}
                      </CardTitle>
                    </CardH>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-chart">
                    <CardH>
                      <h5 className="card-category">Total em Pendência</h5>
                      <CardTitle tag="h3" style={{ color: "red" }}>
                        <FaUserMinus style={{ marginRight: 15 }} />
                        {formatMoney(
                          payment.data.totalizers
                            ? payment.data.totalizers.totalDue
                            : 0
                        )}
                      </CardTitle>
                    </CardH>
                  </Card>
                </Col>
              </Row>
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
  player: state.player,
  payment: state.payment,
});

const mapDispatchToProps = (dispatch) => ({
  clearAction: () => dispatch(PaymentActions.clear()),
  fetchAction: (payload) => dispatch(PaymentActions.fetch(payload)),
  createAction: (payload) => dispatch(PaymentActions.create(payload)),
  updateAction: (payload) => dispatch(PaymentActions.update(payload)),
  removeAction: (payload) => dispatch(PaymentActions.remove(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
