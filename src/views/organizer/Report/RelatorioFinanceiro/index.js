import React, { useState } from "react";
import "../styles.css";
import ReportActions from "../../../../store/report/report.actions";
import { formatMoney } from "../../../../utils/Currency";
import { jsPDF } from "jspdf";
import CsvDownloader from "react-csv-downloader";

import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import { useEffect } from "react";

const title = "RELATÓRIO FINANCEIRO";

const csvColumns = [
  { displayName: "JOGADOR", id: "name" },
  { displayName: "VALOR DEVIDO", id: "due_value" },
  { displayName: "VALOR PAGO", id: "paid_value" }
];

const pdfColumns = [
  {
    id: "name",
    name: "name",
    prompt: "JOGADOR",
    width: 245,
    align: "left"
  },
  {
    id: "due_value",
    name: "due_value",
    prompt: "VALOR DEVIDO",
    width: 70,
    align: "center"
  },
  {
    id: "paid_value",
    name: "paid_value",
    prompt: "VALOR PAGO",
    width: 70,
    align: "center"
  }
];

const Relatorio = ({dateStart, dateEnd, change}) => {
  const [listagemExport, setListagemExport] = useState();

  const handlePDF = async () => {
    await handleListagem();

    if (listagemExport && listagemExport.length > 0) {
      var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
      doc.text(title, 155, 25, null, null, "center");
      doc.table(4, 40, listagemExport, pdfColumns, { fontSize: 8, padding: 2 });
      doc.save(title);
    }
  };

  useEffect(() => {
    console.log(dateStart, dateEnd)
    if(dateStart && dateEnd){
      handleListagem()
    }
  }, [change])

  const handleListagem = async () => {
    const paramsExport = {
      dateStart,
      dateEnd
    };

    const dataExport = await ReportActions.financeiro(paramsExport);
    if (dataExport) {
      const formatted = dataExport.data.map(i => {
        return {
          due_value: formatMoney(i.due_value),
          paid_value: formatMoney(i.paid_value),
          name: i.name
        }
      });
      setListagemExport(formatted);
    }
  };

  return (
    <UncontrolledDropdown style={{margin: 0}}>
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
};

export default Relatorio;
