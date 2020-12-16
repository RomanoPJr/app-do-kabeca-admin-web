import moment from "moment";
import { connect } from "react-redux";
import { CardBody } from "reactstrap";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

import ModalDelete from "./ModalDelete";
import ModalCreate from "./ModalCreate";
import Table from "../../../components/Table";
import Container from "../../../components/Container";
import CardHeader from "../../../components/CardHeader";
import SeasonActions from "../../../store/season/season.actions";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const Seasons = ({
  season,
  fetchAction,
  clearAction,
  createAction,
  removeAction,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();

  useEffect(() => {
    fetchAction({ pageNumber });
  }, [pageNumber]);

  useEffect(() => {
    if (!season.loading && modalCreateOpened && season.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    } else if (!season.loading && season.error !== "") {
      toast.error(season.error);
    } else if (!season.loading && modalDeleteOpened && season.error === "") {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    }
  }, [season.loading]);

  function handleSubmitForm(evt, data) {
    if (!data.id) {
      createAction(data);
    }
    evt.preventDefault();
  }

  return (
    <Container loading={season.loading}>
      <CardHeader
        setModalCreateOpened={setModalCreateOpened}
        title="Temporadas"
      />
      <CardBody>
        <Table
          setPageNumber={setPageNumber}
          isLoading={season.loading}
          data={season.data}
          columns={[
            { name: "Nome", attribute: "name" },
            { name: "Data de início", render: ({ data }) => moment(data.date_start).format('DD/MM/YYYY') },
            { name: "Data de fim", render: ({ data }) => moment(data.date_end).format('DD/MM/YYYY') },
            {
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  setCurrentData={setCurrentData}
                  setModalDeleteOpened={setModalDeleteOpened}
                  setModalCreateOpened={setModalCreateOpened}
                />
              )
            }
          ]}
        />
      </CardBody>
      {modalCreateOpened && (
        <ModalCreate
          data={currentData}
          loading={season.loading}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          confirmAction={handleSubmitForm}
        />
      )}
      {modalDeleteOpened && (
        <ModalDelete
          data={currentData}
          loading={season.loading}
          opened={modalDeleteOpened}
          confirmAction={removeAction}
          setOpened={setModalDeleteOpened}
        />
      )}
    </Container>
  );
};

const ActionColumn = ({
  data,
  setCurrentData,
  setModalDeleteOpened
}) => (
  <div className="action-column">
    <DeleteButton
      onClick={() => {
        setCurrentData(data);
        setModalDeleteOpened(true);
      }}
    />
  </div>
);

const mapStateToProps = state => ({
  season: state.season
});

const mapDispatchToProps = dispatch => ({
  fetchAction: payload => dispatch(SeasonActions.fetch(payload)),
  createAction: payload => dispatch(SeasonActions.create(payload)),
  removeAction: payload => dispatch(SeasonActions.remove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Seasons);
