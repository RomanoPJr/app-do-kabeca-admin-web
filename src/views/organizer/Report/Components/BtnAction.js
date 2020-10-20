import React from "react";
import CsvDownloader from "react-csv-downloader";

import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

function SectionOne({ title, csvColumns, listagemExport, handlePDF }) {
  return (
    <UncontrolledDropdown>
      <DropdownToggle
        caret
        data-toggle="dropdown"
        className="btn-match-actions"
      >
        EXPORTAR
      </DropdownToggle>
      <DropdownMenu>
        <CsvDownloader
          filename={title}
          separator=";"
          columns={csvColumns}
          datas={listagemExport}
        >
          <DropdownItem className="dropMatchItem">{`CSV`}</DropdownItem>
        </CsvDownloader>

        <DropdownItem
          className="dropMatchItem"
          onClick={handlePDF}
        >{`PDF`}</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default SectionOne;
