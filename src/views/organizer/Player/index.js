import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBody } from "reactstrap";
import { toast } from "react-toastify";

import ModalCreate from "./ModalCreate";
import ModalDelete from "./ModalDelete";
import Table from "../../../components/Table";
import { formatPhone } from "../../../utils/Phone";
import Container from "../../../components/Container";
import CardHeader from "../../../components/CardHeader";
import UserAction from "../../../store/user/user.actions";
import PlayerActions from "../../../store/player/player.actions";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const Player = ({
  user,
  player,
  clearAction,
  fetchAction,
  createAction,
  updateAction,
  removeAction,
  fetchOneUser,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const [modalDeleteOpened, setModalDeleteOpened] = useState(false);

  useEffect(() => {
    fetchAction({ pageNumber });
  }, [pageNumber]);

  useEffect(() => {
    return () => {
      clearAction();
    };
  }, []);

  useEffect(() => {
    if (!modalCreateOpened && !modalDeleteOpened) {
      setCurrentData({});
    }
  }, [modalCreateOpened, modalDeleteOpened]);

  useEffect(() => {
    if (!player.loading && modalCreateOpened && player.error === "") {
      setModalCreateOpened(false);
      toast.success("Registro salvo com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    } else if (!player.loading && player.error !== "") {
      toast.error(player.error);
    } else if (!player.loading && modalDeleteOpened && player.error === "") {
      setModalDeleteOpened(false);
      toast.success("Registro deletado com sucesso!");
      fetchAction({ pageNumber });
      setCurrentData(null);
    }
  }, [player.loading]);

  function handleSubmitForm(evt, data) {
    if (!data.id) {
      createAction(data);
    } else {
      updateAction(data);
    }
    evt.preventDefault();
  }

  return (
    <Container loading={player.loading}>
      <CardHeader
        setModalCreateOpened={setModalCreateOpened}
        title="Jogadores (Cadastre até 60 Jogadores)"
      />
      <CardBody>
        <Table
          setPageNumber={setPageNumber}
          isLoading={player.loading}
          data={player.data}
          columns={[
            { name: "Nome", attribute: "User.name" },
            {
              name: "Telefone",
              render: ({ data }) => formatPhone(data.User.phone),
            },
            { name: "Posição", attribute: "position" },
            { name: "Tipo", attribute: "type" },
            { name: "Status do Convite", attribute: "invite" },
            {
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  setCurrentData={setCurrentData}
                  setModalDeleteOpened={setModalDeleteOpened}
                  setModalCreateOpened={setModalCreateOpened}
                />
              ),
            },
          ]}
        />
      </CardBody>
      {modalCreateOpened && (
        <ModalCreate
          data={currentData}
          user={user.findOne}
          loading={player.loading}
          userLoading={user.loading}
          opened={modalCreateOpened}
          fetchOneUser={fetchOneUser}
          setOpened={setModalCreateOpened}
          confirmAction={handleSubmitForm}
        />
      )}
      {modalDeleteOpened && (
        <ModalDelete
          data={currentData}
          loading={player.loading}
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
  setModalDeleteOpened,
  setModalCreateOpened,
}) => (
  <div className="action-column">
    <DeleteButton
      onClick={() => {
        setCurrentData(data);
        setModalDeleteOpened(true);
      }}
    />
    <EditButton
      onClick={() => {
        setCurrentData(data);
        setModalCreateOpened(true);
      }}
    />
  </div>
);

const mapStateToProps = (state) => ({
  user: state.user,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  clearAction: () => dispatch(PlayerActions.clear()),
  fetchAction: (payload) => dispatch(PlayerActions.fetch(payload)),
  createAction: (payload) => dispatch(PlayerActions.create(payload)),
  updateAction: (payload) => dispatch(PlayerActions.update(payload)),
  removeAction: (payload) => dispatch(PlayerActions.remove(payload)),
  fetchOneUser: (payload) => dispatch(UserAction.fetchOne(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
