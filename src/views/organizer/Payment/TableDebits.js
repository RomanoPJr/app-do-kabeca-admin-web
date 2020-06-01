import React from "react";
import { FaEdit, FaCheck, } from "react-icons/fa";

import Table from "../../../components/Table";
import { formatMoney } from "../../../utils/Currency";
import { formatPhone } from "../../../utils/Phone";

const PaymentsTable = ({ payment, confirmAction, setPageNumber, setCurrentData, setModalCreateOpened }) => {
  return (
    <Table
      setPageNumber={setPageNumber}
      isLoading={payment.loading}
      data={payment.data}
      columns={[
        { name: "Nome", attribute: "User.name" },
        {
          name: "Telefone", render: ({ data }) => {
            if (data.User) {
              return formatPhone(data.User.phone)
            }
          }
        },
        {
          name: "Valor a Receber",
          render: ({ data }) => data.position === 'COLABORADOR' ? formatMoney() : formatMoney(data.monthly_payment)
        },
        {
          name: "",
          render: ({ data }) => {
            if (data && data.position === 'COLABORADOR') {
              return <div className="positionTag">{data.position}</div >
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
          club_player_id: data.id,
          name: data.User.name,
          phone: data.User.phone,
          due_value: data.monthly_payment,
          position: data.position,
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
          club_player_id: data.id,
          due_value: data.position === 'COLABORADOR' ? 0 : data.monthly_payment,
          paid_value: data.position === 'COLABORADOR' ? 0 : data.monthly_payment,
        })
      }}
    >
      <FaCheck />
    </button>
  </div>
);


export default PaymentsTable;
