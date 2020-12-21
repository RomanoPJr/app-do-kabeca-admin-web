import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { CardBody, Tooltip, Button } from "reactstrap";
import { FaListOl, FaPaperPlane, FaEye, FaCheck } from "react-icons/fa";

import "./styles.css";
import ModalCreate from "./ModalCreate.js";
import ModalInvite from "./ModalInvite.js";
import ModalConfirm from "./ModalConfirm.js";
import Container from "../../../components/Container";
import Table from "../../../components/Table/index.js";
import MatchActions from "../../../store/match/match.actions.js";
import CardHeader from "../../../components/CardHeader/index.js";
import ModalConfirmatedPlayers from "./ModalConfirmatedPlayers.js";
import EditButton from "../../../components/ActionButtons/EditButton.js";

const Match = ({ history, session, matchDetail, createMatch, fetchMatchList }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalCreateOpened, setModalCreateOpened] = useState();
  const [modalInviteOpened, setModalInviteOpened] = useState();
  const [modalConfirmOpened, setModalConfirmOpened] = useState(false);
  const [tooltipShareOpen, setShareTooltipOpen] = useState(false);
  const [modalConfirmatedOpened, setModalConfirmatedOpened] = useState();

  useEffect(() => {
    fetchMatchList({ pageNumber });
  }, [pageNumber]);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggleShare = () => setShareTooltipOpen(!tooltipShareOpen);

  const handleSaveAction = async data => {
    await createMatch(data);
  };

  return (
    <Container>
      <CardHeader
        {...session.type === 'ORGANIZER' ? { setModalCreateOpened: setModalCreateOpened } : {}}
        title="PELADAS"
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
              name: "STATUS",
              render: ({ data }) => {
                return session.type === 'ORGANIZER' ? (
                  <div>
                    {data.MatchInvite && (
                      <b style={{     
                        padding: 5, 
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 5, 
                        backgroundColor: '#e0c422',
                        textAlign: 'center',
                        width: 55,
                      }}>
                        <FaPaperPlane style={{marginRight: 10}}/>
                        CONVITE ENVIADO
                      </b>
                    )}
                </div>
                ) : (
                  <div>
                    {data.match_invite_confirmation_id !== null && (
                      <b style={{
                        padding: 5, 
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 5, 
                        backgroundColor: '#e0c422',
                        textAlign: 'center',
                        width: 55,
                      }}>
                        <FaCheck style={{marginRight: 10}}/>
                        PRESENÇA CONFIRMADA
                      </b>
                    )}
                  </div>
                )
              }
            },
            {
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  toggle={toggle}
                  history={history}
                  session={session}
                  toggleShare={toggleShare}
                  tooltipOpen={tooltipOpen}
                  setCurrentData={setCurrentData}
                  tooltipShareOpen={tooltipShareOpen}
                  setModalInviteOpened={setModalInviteOpened}
                  setModalCreateOpened={setModalCreateOpened}
                  setModalConfirmOpened={setModalConfirmOpened}
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
      {modalInviteOpened && (
        <ModalInvite
          data={currentData}
          opened={modalInviteOpened}
          setOpened={setModalInviteOpened}
          fetchMatchList={fetchMatchList}
          pageNumber={pageNumber}
        />
      )}
      {modalConfirmOpened && (
        <ModalConfirm
          data={currentData}
          opened={modalConfirmOpened}
          setOpened={setModalConfirmOpened}
          fetchMatchList={fetchMatchList}
          pageNumber={pageNumber}
        />
      )}
    </Container>
  );
};

const ActionColumn = ({
  data,
  toggle,
  history,
  session,
  tooltipOpen,
  toggleShare,
  setCurrentData,
  tooltipShareOpen,
  setModalInviteOpened,
  setModalConfirmOpened,
  setModalConfirmatedOpened
}) => {
  let dayInvited= !data.MatchInvite
  
  return (
    <div className="action-column">
      {session.type === 'ORGANIZER' ?
        (<>
          {data.MatchInvite === null && (
            <div>
          {/* <Tooltip
            placement="top"
            target="btn-invite"
            toggle={toggle}
            isOpen={tooltipOpen}
          >
            CONVIDAR JOGADORES
          </Tooltip> */}
          <Button id="btn-invite" className="btn-icon btn-invite" onClick={() => {
            setCurrentData(data);
            setModalInviteOpened(true)
           }}>
            <FaPaperPlane />
          </Button>
          </div>
          )}
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
          <EditButton
            onClick={() => {
              history.push(`/matches/${data.date}`);
            }}
          />
        </>) : (
          <div>
          {data.match_invite_confirmation_id === null && (
          <Button id="btn-confirm" className="btn-confirm" onClick={() => {
            setCurrentData(data);
            setModalConfirmOpened(true)
          }}>
            <FaCheck /> CONFIRMAR PRESENÇA
          </Button>
          )}
          <Button  className="btn-icon btn-primary" onClick={() => {
            history.push(`/matches/${data.date}`);
          }}>
            <FaEye />
          </Button>
          </div>
        )
      }
    </div>
  )
};

const mapStateToProps = state => ({
  matchDetail: state.match,
  session: state.session.data
});

const mapDispatchToProps = dispatch => ({
  createMatch: payload => MatchActions.create(payload),
  fetchMatchList: payload => dispatch(MatchActions.fetchList(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Match);
