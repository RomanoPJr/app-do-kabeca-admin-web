import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Row, Col, CardBody } from 'reactstrap';
import classnames from 'classnames';


import Filter from "./Filter";
import Counters from "./Counters";
import CardHeader from "./CardHeader";
import TableDebits from "./TableDebits";
import ModalCreate from "./ModalCreate";
import TablePayments from "./TablePayments";
import ClubActions from "../../../store/club/club.actions";
import PaymentActions from "../../../store/payment/payment.actions";

const Payment = ({
  club,
  payment,
  updateClub,
  clearAction,
  fetchAction,
  createAction,
  updateAction,
}) => {
  const [totalizers, setTotalizers] = useState();
  const [filterYear, setFilterYear] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [crudSent, setCrudSent] = useState(false);
  const [filterMonth, setFilterMonth] = useState();
  const [currentData, setCurrentData] = useState({});
  const [switchValue, setSwitchValue] = useState(false);
  const [modalCreateOpened, setModalCreateOpened] = useState(false);

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    handleFetch();
  }, [activeTab, pageNumber, filterMonth, filterYear]);

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
    if (!payment.loading && crudSent) {
      setCrudSent(false)
      if (payment.error === "") {
        setModalCreateOpened(false);
        toast.success("Registro salvo com sucesso!");
        handleFetch();
      } else if (!payment.loading && payment.error !== "") {
        toast.error(payment.error);
      }
    }
  }, [payment.loading]);

  function handleFetch() {
    if (filterMonth && filterYear && filterYear.toString().length === 4) {
      var type = '';
      if (activeTab) {
        type = activeTab === '1' ? 'paid' : 'debit'
      }
      fetchAction({ pageNumber, year: filterYear, month: filterMonth, type });
    }
  }

  function handleSubmitForm(evt, data) {
    if (activeTab === '1') {
      updateAction(data);
    } else if (activeTab === '2') {
      createAction(data);
    }
    if (evt) {
      evt.preventDefault();
    }
    setCrudSent(true)
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
              <Tabs
                payment={payment}
                activeTab={activeTab}
                toggle={toggleTab}
                confirmAction={handleSubmitForm}
                setPageNumber={setPageNumber}
                setCurrentData={setCurrentData}
                setModalCreateOpened={setModalCreateOpened}
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
  activeTab,
  confirmAction,
  setPageNumber,
  setCurrentData,
  setModalCreateOpened
}) => {
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Pagamentos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Débitos
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              {activeTab === '1' && <TablePayments
                payment={payment || {}}
                setPageNumber={setPageNumber}
                setCurrentData={setCurrentData}
                setModalCreateOpened={setModalCreateOpened}
              />}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              {activeTab === '2' &&
                < TableDebits
                  payment={payment || {}}
                  setPageNumber={setPageNumber}
                  setCurrentData={setCurrentData}
                  confirmAction={confirmAction}
                  setModalCreateOpened={setModalCreateOpened}
                />
              }
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  )
}
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
