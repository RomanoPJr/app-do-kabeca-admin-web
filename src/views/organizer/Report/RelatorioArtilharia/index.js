import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Collapse, Input, FormGroup } from "reactstrap";
import moment from "moment";
import "../styles.css";
import Table from "../../../../components/Table";
import CardHeader from "../../../../components/CardHeader";
import ReportActions from "../../../../store/report/report.actions";
import BtnAction from "../Components/BtnAction";
import { jsPDF } from "jspdf";

const title = "RELATÓRIO DE ARTILHEIROS";

const columns = [
  { name: "JOGADOR", attribute: "name" },
  { name: "GOLS", attribute: "qtd_gols" }
];

const csvColumns = [
  {
    id: "name",
    displayName: "JOGADOR"
  },
  {
    id: "qtd_gols",
    displayName: "GOLS"
  }
];

const pdfColumns = [
  {
    id: "name",
    name: "name",
    prompt: "JOGADOR",
    width: 200,
    align: "left"
  },
  {
    id: "qtd_gols",
    name: "qtd_gols",
    prompt: "GOLS",
    width: 70,
    align: "center"
  }
];

const Relatorio = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [listagem, setListagem] = useState();
  const [listagemExport, setListagemExport] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [dateEnd, setDateEnd] = useState(moment().format("YYYY-MM-DD"));
  const [dateStart, setDateStart] = useState(
    moment()
      .subtract(6, "month")
      .format("YYYY-MM-DD")
  );

  const handlePDF = () => {
    var doc = new jsPDF({ putOnlyUsedFonts: true });
    doc.text(title, 105, 25, null, null, "center");
    doc.table(4, 40, listagemExport, pdfColumns);
    doc.save(title);
  };

  const handleListagem = async () => {
    const params = {
      pageNumber,
      pageSize: 10,
      dateStart,
      dateEnd
    };

    const data = await ReportActions.artilharia(params);
    if (data) {
      setListagem(data);
    }

    const paramsExport = {
      dateStart,
      dateEnd
    };

    const dataExport = await ReportActions.artilharia(paramsExport);
    if (dataExport) {
      setListagemExport(dataExport.data);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleListagem();
    }
  }, [dateEnd, dateStart, pageNumber, isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Row>
      <Col md="12">
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 25
            }}
          >
            <CardHeader title={title} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Button color="primary" onClick={toggle}>
                VISUALIZAR
              </Button>
            </div>
          </div>
          <div>
            <Collapse isOpen={isOpen} style={{ padding: 25 }}>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <label>DATA DE INÍCIO</label>
                    <Input
                      type="date"
                      value={dateStart}
                      required={true}
                      onChange={event =>
                        setDateStart(event.target.value.toUpperCase())
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <label>DATA DE FIM</label>
                  <Input
                    type="date"
                    value={dateEnd}
                    required={true}
                    onChange={event =>
                      setDateEnd(event.target.value.toUpperCase())
                    }
                  />
                </Col>
                <Col
                  md="4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingTop: 13
                  }}
                >
                  <BtnAction
                    title={title}
                    csvColumns={csvColumns}
                    listagemExport={listagemExport}
                    handlePDF={handlePDF}
                  />
                </Col>
              </Row>
              <Table
                setPageNumber={setPageNumber}
                data={listagem}
                columns={columns}
              />
            </Collapse>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Relatorio;
