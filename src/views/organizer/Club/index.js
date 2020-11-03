import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBody, Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";

import {
  FaPencilAlt,
  FaMoneyBillWave,
  FaUsersCog,
  FaUsers,
  FaHandPaper,
  FaRegAddressCard,
  FaUserMinus
} from "react-icons/fa";

import "./styles.css";
import EmptyState from "./EmptyState";
import ModalCreate from "./ModalCreate";
import Container from "../../../components/Container";
import CardHeader from "../../../components/CardHeader";
import ClubActions from "../../../store/club/club.actions";
import LocationActions from "../../../store/location/location.actions";

const Club = ({
  club,
  ufs,
  cities,
  fetchUFS,
  fetchAction,
  fetchCities,
  clearAction,
  createAction,
  updateAction,
  ufs_loading
}) => {
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    fetchAction();
  }, []);

  useEffect(() => {
    if (!club.loading && modalCreateOpened && club.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction();
    } else if (!club.loading && club.error !== "") {
      toast.error(club.error);
    }
  }, [club.loading]);

  useEffect(() => {
    if (club.data) {
      const size = 30;
      if (club.data.totals) {
        setCounters([
          {
            name: "TOTAL DE ASSOCIADOS",
            value: club.data.totals.total_associados,
            icon: <FaUsers className="card-counter-icon" size={size} />,
            color: "#1d7a91"
          },
          {
            name: "TOTAL DE GOLEIROS",
            value: club.data.totals.total_goleiros,
            icon: <FaHandPaper className="card-counter-icon" size={size} />,
            color: "#c9761c"
          },
          {
            name: "TOTAL DE COLABORADORES",
            value: club.data.totals.total_colaboradores,
            icon: <FaUsersCog className="card-counter-icon" size={size} />,
            color: "#bd3c3c"
          },
          {
            name: "TOTAL DE PAGANTES",
            value: club.data.totals.total_pagantes,
            icon: <FaMoneyBillWave className="card-counter-icon" size={size} />,
            color: "#991f4b"
          },
          {
            name: "TOTAL DE NÃO PAGANTES",
            value: club.data.totals.total_nao_pagantes,
            icon: <FaUserMinus className="card-counter-icon" size={size} />,
            color: "#e0c422"
          },
          {
            name: "MÉDIA DE IDADE",
            value: Math.round(Number(club.data.totals.average_age)),
            icon: (
              <FaRegAddressCard className="card-counter-icon" size={size} />
            ),
            color: "#389421"
          }
        ]);
      }
    }
  }, [club.data]);

  function handleSubmitForm(evt, data) {
    if (data.id) {
      updateAction(data);
    } else {
      createAction(data);
    }
    evt.preventDefault();
  }

  return (
    <Container loading={club.loading} className="card-user">
      <CardHeader
        setModalCreateOpened={club.data ? setModalCreateOpened : null}
        title="Clube"
        btnText="Editar"
        btnIcon={<FaPencilAlt />}
      />
      <CardBody>
        {club.data ? (
          <Row>
            <Col md={12}>
              <div className="author">
                <div className="block block-one"></div>
                <div className="block block-two"></div>
                <div className="block block-three"></div>
                <div className="block block-four"></div>
                <img className="avatar" src={club.data.logo_url} alt="..." />
                <h2
                  className="description"
                  style={{ marginTop: 25, marginBottom: 25 }}
                >
                  {club.data.name}
                </h2>
              </div>
            </Col>
            <Col md={6}>
              <div className="card-description">
                <h5>
                  <b>DIA:</b>
                  {` ${club.data.day}`}
                </h5>
                <h5>
                  <b>HORÁRIO:</b>
                  {` ${club.data.time
                    .split(":")
                    .slice(0, 2)
                    .join(":")} HRS`}
                </h5>
                <h5>
                  <b>LOCAL:</b>
                  {` ${club.data.city}/${club.data.state}`}
                </h5>
              </div>
            </Col>
            <Col md={6}>
              <div className="card-description">
                <h5>
                  <b>INÍCIO DA TEMPORADA:</b>
                  {club.data.session_start
                    ? ` ${moment(club.data.session_start.split("T")[0]).format(
                        "DD/MM/YYYY"
                      )}`
                    : ""}
                </h5>
                <h5>
                  <b>FIM DA TEMPORADA:</b>
                  {club.data.session_end
                    ? ` ${moment(club.data.session_end.split("T")[0]).format(
                        "DD/MM/YYYY"
                      )}`
                    : ""}
                </h5>
              </div>
            </Col>
            {counters.map((item, i) => (
              <div className="col-lg-4" key={`item` + i}>
                <div
                  className="card-chart card card-counter"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="card-header card-counter-header">
                    <div>{item.icon}</div>
                    <div>
                      <h5 className="card-category">{item.name}</h5>
                      <h3 className="card-title">{item.value}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Row>
        ) : (
          <EmptyState setModalCreateOpened={setModalCreateOpened} />
        )}
      </CardBody>
      {modalCreateOpened && (
        <ModalCreate
          data={club.data}
          loading={club.loading}
          ufs={ufs}
          cities={cities}
          fetchUFS={fetchUFS}
          fetchCities={fetchCities}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          confirmAction={handleSubmitForm}
          ufs_loading={ufs_loading}
        />
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  club: state.club,
  ufs: state.location.data.ufs,
  ufs_loading: state.location.loading,
  cities: state.location.data.cities
});

const mapDispatchToProps = dispatch => ({
  fetchAction: payload => dispatch(ClubActions.fetch(payload)),
  fetchUFS: () => dispatch(LocationActions.fetchUFS()),
  fetchCities: payload => dispatch(LocationActions.fetchCities(payload)),
  createAction: payload => dispatch(ClubActions.create(payload)),
  updateAction: payload => dispatch(ClubActions.update(payload)),
  removeAction: payload => dispatch(ClubActions.remove(payload)),
  clearAction: () => dispatch(ClubActions.clear())
});

export default connect(mapStateToProps, mapDispatchToProps)(Club);
