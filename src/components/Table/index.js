import React from "react";
import { Table as DataTable } from "reactstrap";
import LoadingTable from "../../components/Table/LoadingTable";
import "./styles.css";

const Table = ({ isLoading, columns, data, setPageNumber }) => {
  function handleNextPage() {
    if (data.pageNumber < data.pageTotal) {
      setPageNumber(parseInt(data.pageNumber) + 1);
    }
  }

  function handlePreviousPage() {
    if (data.pageNumber > 1) {
      setPageNumber(parseInt(data.pageNumber) - 1);
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
              </tr>
            </thead>
            <tbody>
              {data.data &&
                data.data.map((item, index) => (
                  <tr key={index}>
                    {columns &&
                      columns.map((column, index) => {
                        if (column.render) {
                          return (
                            <td
                              key={index}
                              className="text-center action-column"
                            >
                              {column.render({ data: item })}
                            </td>
                          );
                        } else {
                          return <td key={index}>{item[column.attribute]}</td>;
                        }
                      })}
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
              {data.pageNumber} / {data.pageTotal}
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
