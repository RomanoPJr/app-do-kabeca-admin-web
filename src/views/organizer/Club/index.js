import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBody } from "reactstrap";
import { toast } from "react-toastify";
import { FaPencilAlt } from "react-icons/fa";

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
    return () => {
      clearAction();
    };
  }, []);

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
          <>
            <div className="author">
              <div className="block block-one"></div>
              <div className="block block-two"></div>
              <div className="block block-three"></div>
              <div className="block block-four"></div>
              <img className="avatar" src={club.data.logo_url} alt="..." />
              <p className="description">{club.data.name}</p>
            </div>
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
          </>
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

const mapStateToProps = (state) => ({
  club: state.club,
  ufs: state.location.data.ufs,
  ufs_loading: state.location.loading,
  cities: state.location.data.cities
});

const mapDispatchToProps = (dispatch) => ({
  fetchAction: (payload) => dispatch(ClubActions.fetch(payload)),
  fetchUFS: () => dispatch(LocationActions.fetchUFS()),
  fetchCities: (payload) => dispatch(LocationActions.fetchCities(payload)),
  createAction: (payload) => dispatch(ClubActions.create(payload)),
  updateAction: (payload) => dispatch(ClubActions.update(payload)),
  removeAction: (payload) => dispatch(ClubActions.remove(payload)),
  clearAction: () => dispatch(ClubActions.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Club);
