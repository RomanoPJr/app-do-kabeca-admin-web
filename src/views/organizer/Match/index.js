import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { CardBody, Tooltip, Button } from "reactstrap";
import { FaListOl, FaPaperPlane, FaCopy } from "react-icons/fa";

import "./styles.css";
import ModalCreate from "./ModalCreate.js";
import ModalDelete from "./ModalDelete.js";
import Container from "../../../components/Container";
import Table from "../../../components/Table/index.js";
import MatchActions from "../../../store/match/match.actions.js";
import CardHeader from "../../../components/CardHeader/index.js";
import ModalConfirmatedPlayers from "./ModalConfirmatedPlayers.js";
import EditButton from "../../../components/ActionButtons/EditButton.js";
import DeleteButton from "../../../components/ActionButtons/DeleteButton.js";
import ModalClone from "./ModalClone";

const Match = ({
  history,
  matchDetail,
  createMatch,
  removeMatch,
  fetchMatchList
}) => {
  const [currentData, setCurrentData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalDeleteOpened, setModalDeleteOpened] = useState();
  const [modalConfirmatedOpened, setModalConfirmatedOpened] = useState();
  const [modalCloneOpened, setModalCloneOpened] = useState();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipShareOpen, setShareTooltipOpen] = useState(false);
  const [tooltipCloneOpen, setCloneTooltipOpen] = useState(false);

  useEffect(() => {
    fetchMatchList({
      pageNumber
    });
  }, []);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggleShare = () => setShareTooltipOpen(!tooltipShareOpen);
  const toggleClone = () => setCloneTooltipOpen(!tooltipCloneOpen);

  const handleSaveAction = async data => {
    await createMatch(data);
  };

  const handleDelete = async id => {
    await removeMatch(id);
    await fetchMatchList({
      pageNumber
    });
    setModalDeleteOpened(false);
  };

  const cloneMatchAction = async () => {
    const {
      date,
      duration,
      modality,
      players_quantity,
      score_type,
      type
    } = currentData;

    await createMatch({
      date,
      duration,
      modality,
      players_quantity,
      score_type,
      type,
      team_a: "TIME A",
      team_b: "TIME B"
    });
  };

  return (
    <Container>
      <CardHeader
        setModalCreateOpened={setModalCreateOpened}
        title="PARTIDAS"
      />
      <CardBody>
        <Table
          setPageNumber={setPageNumber}
          isLoading={matchDetail.loading}
          data={matchDetail.list}
          columns={[
            {
              name: "DATA",
              render: ({ data }) => moment(data.date).format("DD/MM/YYYY")
            },
            {
              name: "TIMES",
              render: ({ data }) => `${data.team_a} X ${data.team_b}`
            },
            { name: "TIPO", attribute: "type" },
            { name: "PONTUAÇÃO", attribute: "score_type" },
            { name: "MODALIDADE", attribute: "modality" },
            {
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  toggle={toggle}
                  history={history}
                  toggleClone={toggleClone}
                  toggleShare={toggleShare}
                  tooltipOpen={tooltipOpen}
                  setCurrentData={setCurrentData}
                  tooltipCloneOpen={tooltipCloneOpen}
                  tooltipShareOpen={tooltipShareOpen}
                  setModalCloneOpened={setModalCloneOpened}
                  setModalDeleteOpened={setModalDeleteOpened}
                  setModalCreateOpened={setModalCreateOpened}
                  setModalConfirmatedOpened={setModalConfirmatedOpened}
                />
              )
            }
          ]}
        />
      </CardBody>
      {modalCloneOpened && (
        <ModalClone
          opened={modalCloneOpened}
          setOpened={setModalCloneOpened}
          confirmAction={cloneMatchAction}
        />
      )}
      {modalConfirmatedOpened && (
        <ModalConfirmatedPlayers
          data={currentData}
          opened={modalConfirmatedOpened}
          setOpened={setModalConfirmatedOpened}
        />
      )}
      {modalCreateOpened && (
        <ModalCreate
          data={currentData}
          opened={modalCreateOpened}
          setOpened={setModalCreateOpened}
          confirmAction={handleSaveAction}
        />
      )}
      {modalDeleteOpened && (
        <ModalDelete
          data={currentData}
          loading={matchDetail.loading}
          opened={modalDeleteOpened}
          setOpened={setModalDeleteOpened}
          confirmAction={handleDelete}
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
  toggleClone,
  tooltipCloneOpen,
  setCurrentData,
  tooltipShareOpen,
  setModalDeleteOpened,
  setModalConfirmatedOpened,
  setModalCloneOpened
}) => (
  <div className="action-column">
    <Tooltip
      placement="top"
      target="btn-clone"
      toggle={toggleClone}
      isOpen={tooltipCloneOpen}
    >
      CLONAR PARTIDA
    </Tooltip>
    <Button
      id="btn-clone"
      className="btn-icon btn-invite"
      onClick={() => {
        setCurrentData(data);
        setModalCloneOpened(true);
      }}
    >
      <FaCopy />
    </Button>
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
    <EditButton
      onClick={() => {
        history.push(`/organizer/matches/${data.id}`);
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
  matchDetail: state.match
});

const mapDispatchToProps = dispatch => ({
  removeMatch: id => MatchActions.remove(id),
  createMatch: payload => MatchActions.create(payload),
  fetchMatchList: payload => dispatch(MatchActions.fetchList(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Match);
