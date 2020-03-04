import React from "react";
import { Table as DataTable } from "reactstrap";
const Table = ({ columns, data }) => {
  return (
    <>
      <DataTable className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            {columns &&
              columns.map((column, index) => (
                <th key={index}>{column.name}</th>
              ))}
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                {columns &&
                  columns.map((column, index) => (
                    <td key={index}>{item[column.attribute]}</td>
                  ))}
                <td className="text-center">ACTION</td>
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
        <button className="btn-fill btn btn-primary">Anterior</button>
        <p style={{ margin: 20 }}>1 / 10</p>
        <button className="btn-fill btn btn-primary">Próximo</button>
      </div>
    </>
  );
};

export default Table;
