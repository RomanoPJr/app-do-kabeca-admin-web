import React, { useEffect, useState } from "react";
import { Table as DataTable } from "reactstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import "./styles.css";
import LoadingTable from "../../components/Table/LoadingTable";

const Table = ({
  isLoading,
  columns,
  data,
  fetchAction,
  updateAction,
  deleteAction
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    fetchAction({ pageNumber, pageSize });
  }, [pageNumber]);

  function handleNextPage() {
    if (pageNumber < data.total) {
      setPageNumber(pageNumber + 1);
    }
  }

  function handlePreviousPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingTable />
      ) : (
        <>
          <DataTable className="tablesorter table" responsive>
            <thead className="text-primary">
              <tr>
                {columns &&
                  columns.map((column, index) => (
                    <th key={index}>{column.name}</th>
                  ))}
                <th className="text-center action-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.data &&
                data.data.map((item, index) => (
                  <tr key={index}>
                    {columns &&
                      columns.map((column, index) => (
                        <td key={index}>{item[column.attribute]}</td>
                      ))}
                    <td className="text-center action-column">
                      <button
                        className="btn btn-danger btn-fab btn-icon btn-round delete-button"
                        onClick={() => deleteAction(item)}
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        className="btn btn-default btn-fab btn-icon btn-round btn-table-action"
                        onClick={() => updateAction(item)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </DataTable>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <button
              className="btn-fill btn btn-info"
              onClick={() => handlePreviousPage()}
            >
              Anterior
            </button>
            <p style={{ margin: 20 }}>
              {pageNumber} / {data.total}
            </p>
            <button
              className="btn-fill btn btn-info"
              onClick={() => handleNextPage()}
            >
              Próximo
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
