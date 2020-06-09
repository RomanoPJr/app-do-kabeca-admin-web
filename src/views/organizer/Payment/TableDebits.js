import React from "react";
import { FaEdit, FaCheck, } from "react-icons/fa";

import Table from "../../../components/Table";
import { formatMoney } from "../../../utils/Currency";

const PaymentsTable = ({ payment, confirmAction, setPageNumber, setCurrentData, setModalCreateOpened }) => {
  return (
    <Table
      setPageNumber={setPageNumber}
      isLoading={payment.loading}
      data={payment.data}
      columns={[
        { name: "Nome", attribute: "name" },
        {
          name: "Valor a Receber",
          render: ({ data }) => {
            if (data.ClubPlayers) {
              return data.ClubPlayers.position === 'COLABORADOR' ? formatMoney() : formatMoney(data.ClubPlayers.monthly_payment)
            }
          }
        },
        {
          name: "",
          render: ({ data }) => {
            if (data.ClubPlayers && data.ClubPlayers.position === 'COLABORADOR') {
              return <div className="positionTag">{data.ClubPlayers.position}</div >
            }
          },
        },
        {
          name: <b className="action-column">Registrar Pagamento</b>,
          render: ({ data }) => (
            <ActionColumn
              data={data}
              confirmAction={confirmAction}
              setCurrentData={setCurrentData}
              setModalCreateOpened={setModalCreateOpened}
            />
          ),
        },
      ]}
    />
  );
};

const ActionColumn = ({ data, confirmAction, setCurrentData, setModalCreateOpened }) => (
  <div className="action-column">
    <button
      style={{ marginRight: 15 }}
      className="btn btn-default btn-icon"
      onClick={() => {
        setCurrentData({
          club_player_id: data.ClubPlayers.id,
          name: data.name,
          phone: data.phone,
          due_value: data.ClubPlayers.monthly_payment,
          position: data.ClubPlayers.position,
          paid_value: 0,
        });
        setModalCreateOpened(true);
      }}
    >
      <FaEdit />
    </button>
    <button
      className="btn btn-icon btn-green"
      onClick={() => {
        confirmAction(null, {
          club_player_id: data.ClubPlayers.id,
          due_value: data.ClubPlayers.position === 'COLABORADOR' ? 0 : data.ClubPlayers.monthly_payment,
          paid_value: data.ClubPlayers.position === 'COLABORADOR' ? 0 : data.ClubPlayers.monthly_payment,
        })
      }}
    >
      <FaCheck />
    </button>
  </div>
);


export default PaymentsTable;
