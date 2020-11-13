import React from "react";
import { Table as DataTable } from "reactstrap";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./styles.css";
import EmptyTable from "./EmptyTable";

const Table = ({ isLoading, columns, data, setPageNumber }) => {
  return !isLoading && data && data.data && data.data.length > 0 ? (
    <TableContent columns={columns} data={data} setPageNumber={setPageNumber} />
  ) : (
    <EmptyTable isLoading={isLoading} />
  );
};

const handleNextPage = (data, setPageNumber) => {
  if (data.pageNumber < data.pageTotal) {
    setPageNumber(parseInt(data.pageNumber) + 1);
  }
};

const handlePreviousPage = (data, setPageNumber) => {
  if (data.pageNumber > 1) {
    setPageNumber(parseInt(data.pageNumber) - 1);
  }
};

const findAttribute = (path, obj) => {
  return path.split(".").reduce(function(prev, curr) {
    return prev ? prev[curr] : null;
  }, obj || "");
};

const TableContent = ({ columns, data, setPageNumber }) => (
  <>
    <DataTable className="tablesorter table" responsive>
      <thead className="text-primary">
        <tr>
          {columns &&
            columns.map((column, index) => <th key={index}>{column.name}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.data &&
          data.data.map((item, index) => (
            <tr key={index}>
              {columns &&
                columns.map((column, index) => {
                  if (column.render) {
                    return <td key={index}>{column.render({ data: item })}</td>;
                  } else {
                    return (
                      <td key={index}>
                        {findAttribute(column.attribute, item)}
                      </td>
                    );
                  }
                })}
            </tr>
          ))}
      </tbody>
    </DataTable>
    {data.pageNumber && data.pageTotal && (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px 0",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <button
          className="btn btn-info"
          onClick={() => handlePreviousPage(data, setPageNumber)}
        >
          <FaArrowLeft />
          ANTERIOR
        </button>
        <p style={{ margin: 20 }}>
          {data.pageNumber} / {data.pageTotal}
        </p>
        <button
          className="btn-fill btn btn-info"
          onClick={() => handleNextPage(data, setPageNumber)}
        >
          PRÓXIMO
          <FaArrowRight />
        </button>
      </div>
    )}
  </>
);

export default Table;
