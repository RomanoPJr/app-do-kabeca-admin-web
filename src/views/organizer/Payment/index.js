import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { ToastContainer, toast } from "react-toastify";
import {
  Nav,
  Row,
  Col,
  Card,
  Button,
  TabPane,
  NavItem,
  NavLink,
  CardBody,
  TabContent
} from "reactstrap";
import classnames from "classnames";

import Filter from "./Filter";
import Counters from "./Counters";
import CardHeader from "./CardHeader";
import TableDebits from "./TableDebits";
import ModalCreate from "./ModalCreate";
import TablePayments from "./TablePayments";
import ClubActions from "../../../store/club/club.actions";
import PaymentActions from "../../../store/payment/payment.actions";
import Relatorio from "../Report/RelatorioFinanceiro";

const Payment = ({
  club,
  session,
  updateClub,
  clearAction,
  createAllNonPayingAction
}) => {
  const [filterYear, setFilterYear] = useState();
  const [pageNumberDebits, setPageNumberDebits] = useState();
  const [pageNumberPayments, setPageNumberPayments] = useState();
  const [activeTab, setActiveTab] = useState("1");
  const [filterMonth, setFilterMonth] = useState();
  const [currentData, setCurrentData] = useState({});
  const [switchValue, setSwitchValue] = useState(false);
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(false);
  const [change, setChange] = useState(false);

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    handleFetch();
  }, [
    activeTab,
    filterYear,
    filterMonth,
    pageNumberDebits,
    pageNumberPayments,
  ]);

  useEffect(() => {
    setPageNumberPayments(1);
    setPageNumberDebits(1);
    setFilterYear(new Date().getFullYear());
    setFilterMonth(`${new Date().getMonth() + 1}`.padStart(2, "0"));

    return () => {
      clearAction();
    };
  }, []);

  useEffect(() => {
    if (club.data) {
      setSwitchValue(club.data.payment_module_view_type === "ALL");
    }
  }, [club]);

  useEffect(() => {
    if (!modalCreateOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened]);

  const handleFetch = async() => {
    
    setChange(!change)
    
    if (filterMonth && filterYear && filterYear.toString().length === 4) {
      var type = "";
      var currentPageNumber = 0;
      if (activeTab) {
        type = activeTab === "1" ? "paid" : "debit";
        currentPageNumber =
          activeTab === "1" ? pageNumberPayments : pageNumberDebits;
      }

      setLoading(true)

      const data = await PaymentActions.fetch({
        pageNumber: currentPageNumber,
        year: filterYear,
        month: filterMonth,
        type
      })

      if(data){
        setPayment(data)
      }

      setLoading(false)
    }
  }

  const handleSubmitForm = async (evt, data) => {
    if (evt) {
      evt.preventDefault();
    }

    setLoading(true)
    const response = await PaymentActions.update(data)

    if (response) {
      setModalCreateOpened(false);
      toast.success("Pagamento atualizado com sucesso!");
      handleFetch();
    } else {
      toast.error("Erro ao processar pagamento");
    }

    setLoading(false)
  }

  function handleSwicthChange(value) {
    updateClub({
      ...club.data,
      payment_module_view_type: value ? "ALL" : "INDIVIDUAL"
    });
  }

  const handleCreateAll = async () => {

    setLoading(true)
    await PaymentActions.createAll({month: filterMonth, year: filterYear})
    handleFetch()
    setLoading(false)
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
              session={session}
              switchValue={switchValue}
              handleSwicthChange={handleSwicthChange}
            />
            <CardBody>
              <Counters totalizers={payment.totalizers} />
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: 'baseline' }}>
              <Relatorio 
                change={change}  
                dateStart={moment(new Date(filterYear, parseInt(filterMonth) -1, 1)).format('YYYY-MM-DD')} 
                dateEnd={moment(new Date(filterYear, parseInt(filterMonth) -1, 1)).endOf('month').format('YYYY-MM-DD')} 
                
              />
              {session.type === 'ORGANIZER' && 
                <Button
                  onClick={() => {
                    createAllNonPayingAction(
                      {
                        month: filterMonth,
                        year: filterYear
                      },
                      {
                        month: filterMonth,
                        year: filterYear,
                        type: activeTab === "1" ? "paid" : "debit",
                        pageNumber:
                          activeTab === "1"
                            ? pageNumberPayments
                            : pageNumberDebits
                      }
                    );
                  }}
                  className="btn-all-registers"
                  color="white"
                  style={{
                    color: "white",
                    background: "#ac971e"
                  }}
                  type="submit"
                >
                  REGISTRAR NÃO PAGANTES
                </Button>
              }
              </div>
              <Tabs
                loading={loading}
                session={session}
                payment={payment}
                toggle={toggleTab}
                activeTab={activeTab}
                filterYear={filterYear}
                filterMonth={filterMonth}
                setCurrentData={setCurrentData}
                confirmAction={handleSubmitForm}
                handleCreateAll={handleCreateAll}
                setPageNumberDebits={setPageNumberDebits}
                setModalCreateOpened={setModalCreateOpened}
                setPageNumberPayments={setPageNumberPayments}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {modalCreateOpened && (
        <ModalCreate
          data={currentData}
          opened={modalCreateOpened}
          confirmAction={handleSubmitForm}
          setOpened={setModalCreateOpened}
        />
      )}
      <ToastContainer />
    </div>
  );
};

const Tabs = ({
  toggle,
  payment,
  session,
  loading,
  activeTab,
  filterYear,
  filterMonth,
  confirmAction,
  setCurrentData,
  handleCreateAll,
  setPageNumberDebits,
  setModalCreateOpened,
  setPageNumberPayments
}) => {
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            MENSALIDADES PAGAS
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            JOGADORES EM DÉBITO
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              {activeTab === "1" && (
                <TablePayments
                  loading={loading}
                  session={session}
                  payment={payment || {}}
                  setPageNumber={setPageNumberPayments}
                  setCurrentData={setCurrentData}
                  setModalCreateOpened={setModalCreateOpened}
                />
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              {activeTab === "2" && (
                <TableDebits
                  loading={loading}
                  session={session}
                  filterYear={filterYear}
                  payment={payment || {}}
                  filterMonth={filterMonth}
                  confirmAction={confirmAction}
                  setCurrentData={setCurrentData}
                  handleCreateAll={handleCreateAll}
                  setPageNumber={setPageNumberDebits}
                  setModalCreateOpened={setModalCreateOpened}
                />
              )}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
};
const mapStateToProps = state => ({
  club: state.club,
  player: state.player,
  session: state.session.data,
});

const mapDispatchToProps = dispatch => ({
  clearAction: () => dispatch(PaymentActions.clear()),
  updateClub: payload => dispatch(ClubActions.update(payload)),
  createAllNonPayingAction: (payload, page) =>
    dispatch(PaymentActions.createAllNonPaying(payload, page)),
  removeAction: (payload, fetchPayload) =>
    dispatch(PaymentActions.remove(payload, fetchPayload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
