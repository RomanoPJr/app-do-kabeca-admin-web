import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CardBody, Button, Tooltip } from "reactstrap";

import "./styles.css";
import moment from "moment";
import ModalDelete from "./ModalDelete";
import ModalCreate from "./ModalCreate";
import {
  FaUserCheck,
  FaShareAlt,
  FaPaperPlane,
  FaListOl
} from "react-icons/fa";
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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipShareOpen, setShareTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggleShare = () => setShareTooltipOpen(!tooltipShareOpen);

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
        title="PARTIDAS"
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
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  toggle={toggle}
                  history={history}
                  toggleShare={toggleShare}
                  tooltipOpen={tooltipOpen}
                  setCurrentData={setCurrentData}
                  tooltipShareOpen={tooltipShareOpen}
                  setModalDeleteOpened={setModalDeleteOpened}
                  setModalCreateOpened={setModalCreateOpened}
                  setModalConfirmatedOpened={setModalConfirmatedOpened}
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

const ActionColumn = ({
  data,
  toggle,
  history,
  tooltipOpen,
  toggleShare,
  setCurrentData,
  tooltipShareOpen,
  setModalDeleteOpened,
  setModalConfirmatedOpened
}) => (
  <div className="action-column">
    <Tooltip
      placement="top"
      target="btn-confirmated"
      toggle={toggleShare}
      isOpen={tooltipShareOpen}
    >
      LISTA DE CONFIRMAÇÕES
    </Tooltip>
    <Button
      id="btn-confirmated"
      className="btn-icon btn-confirmated"
      onClick={() => {
        setCurrentData(data);
        setModalConfirmatedOpened(true);
      }}
    >
      <FaListOl />
    </Button>
    <Tooltip
      placement="top"
      target="btn-invite"
      toggle={toggle}
      isOpen={tooltipOpen}
    >
      CONVIDAR JOGADORES
    </Tooltip>
    <Button id="btn-invite" className="btn-icon btn-invite" onClick={() => {}}>
      <FaPaperPlane />
    </Button>
    {/* <Button id="btn-share" className="btn-icon btn-share">
      <FaShareAlt />
    </Button> */}
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
