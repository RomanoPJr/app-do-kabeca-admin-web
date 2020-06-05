import React from "react";
import moment from 'moment';
import { FaEdit, } from "react-icons/fa";
import { formatPhone } from "../../../utils/Phone";

import Table from "../../../components/Table";
import { formatMoney } from "../../../utils/Currency";

const PaymentsTable = ({ payment, setPageNumber, setCurrentData, setModalCreateOpened }) => {

  return (
    <Table
      setPageNumber={setPageNumber}
      isLoading={payment.loading}
      data={payment.data}
      columns={[
        { name: "Nome", attribute: "name" },
        {
          name: "Telefone", render: ({ data }) => {
            if (data.phone) {
              return formatPhone(data.phone)
            }
          }
        },
        { name: "Valor a Receber", render: ({ data }) => formatMoney(data.due_value || 0) },
        {
          name: "Valor Recebido",
          render: ({ data }) => (
            <p style={{ color: data.due_value === data.paid_value ? '#ffffffb3' : "red" }}>{formatMoney(data.paid_value | 0)}</p>
          ),
        },
        {
          name: "PAGO EM",
          render: ({ data }) => moment(data.createdAt).format('DD/MM/YYYY'),
        },
        {
          name: "",
          render: ({ data }) => {
            if (data.position && data.position === 'COLABORADOR') {
              return <div className="positionTag">{data.position}</div >
            }
          },
        },
        {
          name: <b className="action-column">Editar Pagamento</b>,
          render: ({ data }) => (
            <ActionColumn
              data={data}
              setCurrentData={setCurrentData}
              setModalCreateOpened={setModalCreateOpened}
            />
          ),
        },
      ]}
    />
  );
};

const ActionColumn = ({ data, setCurrentData, setModalCreateOpened }) => (
  <div className="action-column">
    <button
      style={{ marginRight: 15 }}
      className="btn btn-default btn-icon"
      onClick={() => {
        setCurrentData(data);
        setModalCreateOpened(true);
      }}
    >
      <FaEdit />
    </button>
  </div>
);


export default PaymentsTable;
