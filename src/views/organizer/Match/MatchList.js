import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CardBody } from "reactstrap";

import "./styles.css";
import moment from "moment";
import ModalDelete from "./ModalDelete";
import ModalCreate from "./ModalCreate";
import { FaUserCheck } from "react-icons/fa";
import Table from "../../../components/Table";
import Container from "../../../components/Container";
import CardHeader from "../../../components/CardHeader";
import ModalConfirmated from "./ModalConfirmatedPlayers";
import SponsorActions from "../../../store/sponsor/sponsor.actions";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const MatchList = ({
  data,
  sponsor,
  history,
  clearAction,
  currentData,
  fetchAction,
  createAction,
  updateAction,
  removeAction,
  setCurrentData
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();
  const [modalConfirmatedOpened, setModalConfirmatedOpened] = useState();

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
    <Container loading={sponsor.loading}>
      <CardHeader
        setModalCreateOpened={setModalCreateOpened}
        title="Partidas"
      />
      <CardBody>
        <Table
          setPageNumber={setPageNumber}
          isLoading={sponsor.loading}
          data={data}
          columns={[
            {
              name: "Data",
              render: ({ data }) => moment(data.date).format("DD/MM/YYYY")
            },
            {
              name: "Times",
              render: ({ data }) => `${data.team_a} X ${data.team_b}`
            },
            { name: "Pontuação", attribute: "score_type" },
            { name: "Status", attribute: "status" },
            {
              name: "Jogadores Confirmados",
              render: ({ data }) => {
                return (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ConfirmatedButton
                      onClick={() => {
                        setCurrentData(data);
                        setModalConfirmatedOpened(true);
                      }}
                    />
                  </div>
                );
              }
            },
            {
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  history={history}
                  setCurrentData={setCurrentData}
                  setModalDeleteOpened={setModalDeleteOpened}
                  setModalCreateOpened={setModalCreateOpened}
                />
              )
            }
          ]}
        />
      </CardBody>
      {modalConfirmatedOpened && (
        <ModalConfirmated
          data={currentData}
          opened={modalConfirmatedOpened}
          setOpened={setModalConfirmatedOpened}
        />
      )}
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
    </Container>
  );
};

const ConfirmatedButton = ({ onClick }) => (
  <button className="btn btn-icon btn-confirmated" onClick={onClick}>
    <FaUserCheck />
  </button>
);

const ActionColumn = ({
  data,
  history,
  setCurrentData,
  setModalDeleteOpened
}) => (
  <div className="action-column">
    <EditButton
      onClick={() => {
        setCurrentData(data);
        history.replace("/organizer/matches/details", { data });
      }}
    />
    <DeleteButton
      onClick={() => {
        setCurrentData(data);
        setModalDeleteOpened(true);
      }}
    />
  </div>
);

const mapStateToProps = state => ({
  sponsor: state.sponsor
});

const mapDispatchToProps = dispatch => ({
  clearAction: () => dispatch(SponsorActions.clear()),
  fetchAction: payload => dispatch(SponsorActions.fetch(payload)),
  createAction: payload => dispatch(SponsorActions.create(payload)),
  updateAction: payload => dispatch(SponsorActions.update(payload)),
  removeAction: payload => dispatch(SponsorActions.remove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchList);
