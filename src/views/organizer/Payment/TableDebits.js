import React from "react";
import { FaCheck } from "react-icons/fa";
import { Button } from "reactstrap";

import Table from "../../../components/Table";
import { formatMoney } from "../../../utils/Currency";
import EditButton from "../../../components/ActionButtons/EditButton";

const TableDebits = ({
  payment,
  session,
  loading,
  filterYear,
  filterMonth,
  confirmAction,
  setPageNumber,
  setCurrentData,
  handleCreateAll,
  setModalCreateOpened
}) => {

  const tableColumns = [
    { name: "Nome", attribute: "ClubPlayer.User.name" },
    {
      name: "Valor a Receber",
      render: ({ data }) => {
        return data.ClubPlayer.position === "COLABORADOR"
          ? formatMoney()
          : formatMoney(data.due_value);
      }
    },
    {
      name: "",
      render: ({ data }) => {
        if (
          data.ClubPlayer &&
          data.ClubPlayer.position === "COLABORADOR"
        ) {
          return (
            <div className="positionTag">
              {data.ClubPlayer.position}
            </div>
          );
        }
      }
    }
  ]

  if (session.type === 'ORGANIZER') {
    tableColumns.push({
      name: <b className="action-column">Registrar Pagamento</b>,
      render: ({ data }) => (
        <ActionColumn
          data={data}
          filterYear={filterYear}
          filterMonth={filterMonth}
          confirmAction={confirmAction}
          setCurrentData={setCurrentData}
          setModalCreateOpened={setModalCreateOpened}
        />
      )
    })
  }

  return payment.data.length > 0 || loading || session.type === 'PLAYER' || payment.data === false ? (
    <Table
      setPageNumber={setPageNumber}
      isLoading={loading}
      data={payment}
      columns={tableColumns}
    />
  ):(
    <div style={{height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <h4>A folha de recebimento deste mês ainda não foi gerada, deseja gerar agora?</h4>
        <Button className="btn-edit" onClick={() => {
          handleCreateAll()
        }}>
          Gerar folha do mês
        </Button>
      </div>
  );
};

const ActionColumn = ({
  data,
  filterYear,
  filterMonth,
  confirmAction,
  setCurrentData,
  setModalCreateOpened
}) => (
    <div className="action-column">
      <EditButton
        onClick={() => {
          setCurrentData({
            id: data.id,
            paid_value: 0,
            year: filterYear,
            month: filterMonth,
            due_value: data.due_value,
            player_id: data.ClubPlayer.id,
            name: data.ClubPlayer.User.name,
            phone: data.ClubPlayer.User.phone,
            position: data.ClubPlayer.position,
          });
          setModalCreateOpened(true);
        }}
      />
      <button
        className="btn btn-icon btn-green"
        onClick={() => {
          confirmAction(null, {
            id: data.id,
            year: filterYear,
            month: filterMonth,
            player_id: data.ClubPlayer.id,
            due_value:
              data.ClubPlayer.position === "COLABORADOR"
                ? 0
                : data.due_value,
            paid_value:
              data.ClubPlayer.position === "COLABORADOR"
                ? 0
                : data.due_value
          });
        }}
      >
        <FaCheck />
      </button>
    </div>
  );

export default TableDebits;
