import React from "react";
import moment from "moment";

import Table from "../../../components/Table";
import { formatMoney } from "../../../utils/Currency";
import EditButton from "../../../components/ActionButtons/EditButton";

const PaymentsTable = ({
  loading,
  session,
  payment,
  setPageNumber,
  setCurrentData,
  setModalCreateOpened,
}) => {

  const tableColumns = [
    { name: "Nome", attribute: "name" },
    {
      name: "Valor a Receber",
      render: ({ data }) => formatMoney(data.due_value || 0)
    },
    {
      name: "Valor Recebido",
      render: ({ data }) => (
        <p
          style={{
            color:
              parseFloat(data.due_value) === parseFloat(data.paid_value)
                ? "#ffffffb3"
                : "red"
          }}
        >
          {formatMoney(data.paid_value || 0)}
        </p>
      )
    },
    {
      name: "PAGO EM",
      render: ({ data }) => moment(data.createdAt).format("DD/MM/YYYY")
    },
    {
      name: "",
      render: ({ data }) => {
        if (data.position && data.position === "COLABORADOR") {
          return <div className="positionTag">{data.position}</div>;
        }
      }
    },
  ]

  if (session.type === 'ORGANIZER') {
    tableColumns.push({
      name: <b className="action-column">Editar Pagamento</b>,
      render: ({ data }) => (
        <ActionColumn
          data={data}
          setCurrentData={setCurrentData}
          setModalCreateOpened={setModalCreateOpened}
        />
      )
    })
  }

  return (
    <Table
      setPageNumber={setPageNumber}
      isLoading={loading}
      data={payment}
      columns={tableColumns}
    />
  );
};

const ActionColumn = ({
  data,
  setCurrentData,
  setModalCreateOpened,
}) => (
    <div className="action-column">
      <EditButton
        onClick={() => {
          setCurrentData(data);
          setModalCreateOpened(true);
        }}
      />
    </div>
  );

export default PaymentsTable;
