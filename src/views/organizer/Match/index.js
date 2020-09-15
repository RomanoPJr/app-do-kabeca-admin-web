import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { CardBody, Tooltip, Button } from "reactstrap";
import { FaListOl, FaPaperPlane } from "react-icons/fa";

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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipShareOpen, setShareTooltipOpen] = useState(false);

  useEffect(() => {
    fetchMatchList({
      pageNumber
    });
  }, []);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggleShare = () => setShareTooltipOpen(!tooltipShareOpen);

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

  return (
    <Container>
      <CardHeader setModalCreateOpened={setModalCreateOpened} title="PELADAS" />
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
    <EditButton
      onClick={() => {
        history.push(`/organizer/matches/${data.date}`);
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
