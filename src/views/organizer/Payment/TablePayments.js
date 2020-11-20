import React from "react";
import moment from "moment";
import { FaEdit, FaTimes } from "react-icons/fa";

import Table from "../../../components/Table";
import { formatMoney } from "../../../utils/Currency";
import EditButton from "../../../components/ActionButtons/EditButton";
import DeleteButton from "../../../components/ActionButtons/DeleteButton";

const PaymentsTable = ({
  session,
  payment,
  setPageNumber,
  setCurrentData,
  setModalCreateOpened,
  removeAction
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
          removeAction={removeAction}
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
  setCurrentData,
  setModalCreateOpened,
  removeAction
}) => (
    <div className="action-column">
      <EditButton
        onClick={() => {
          setCurrentData(data);
          setModalCreateOpened(true);
        }}
      />
      <DeleteButton
        onClick={() => {
          removeAction(data.id);
        }}
      />
    </div>
  );

export default PaymentsTable;
