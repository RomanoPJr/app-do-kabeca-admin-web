import React from "react";
import { FaEdit, FaCheck } from "react-icons/fa";

import Table from "../../../components/Table";
import { formatMoney } from "../../../utils/Currency";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const TableDebits = ({
  filterYear,
  filterMonth,
  payment,
  session,
  confirmAction,
  setPageNumber,
  setCurrentData,
  setModalCreateOpened
}) => {

  const tableColumns = [
    { name: "Nome", attribute: "name" },
    {
      name: "Valor a Receber",
      render: ({ data }) => {
        if (data.ClubPlayers) {
          return data.ClubPlayers[0].position === "COLABORADOR"
            ? formatMoney()
            : formatMoney(data.ClubPlayers[0].monthly_payment);
        }
      }
    },
    {
      name: "",
      render: ({ data }) => {
        if (
          data.ClubPlayers &&
          data.ClubPlayers[0].position === "COLABORADOR"
        ) {
          return (
            <div className="positionTag">
              {data.ClubPlayers[0].position}
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

  return (
    <Table
      setPageNumber={setPageNumber}
      isLoading={payment.loading}
      data={payment.data}
      columns={tableColumns}
    />
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
            club_player_id: data.ClubPlayers[0].id,
            name: data.name,
            phone: data.phone,
            due_value: data.ClubPlayers[0].monthly_payment,
            position: data.ClubPlayers[0].position,
            paid_value: 0
          });
          setModalCreateOpened(true);
        }}
      />
      <button
        className="btn btn-icon btn-green"
        onClick={() => {
          confirmAction(null, {
            year: filterYear,
            month: filterMonth,
            club_player_id: data.ClubPlayers[0].id,
            due_value:
              data.ClubPlayers[0].position === "COLABORADOR"
                ? 0
                : data.ClubPlayers[0].monthly_payment,
            paid_value:
              data.ClubPlayers[0].position === "COLABORADOR"
                ? 0
                : data.ClubPlayers[0].monthly_payment
          });
        }}
      >
        <FaCheck />
      </button>
    </div>
  );

export default TableDebits;
