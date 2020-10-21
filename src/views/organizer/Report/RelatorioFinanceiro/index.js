import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Collapse, Input, FormGroup } from "reactstrap";
import moment from "moment";
import "../styles.css";
import Table from "../../../../components/Table";
import CardHeader from "../../../../components/CardHeader";
import ReportActions from "../../../../store/report/report.actions";
import BtnAction from "../Components/BtnAction";
import { jsPDF } from "jspdf";

const title = "RELATÓRIO FINANCEIRO";

const columns = [
  { name: "JOGADOR", attribute: "name" },
  { name: "VALOR DEVIDO", attribute: "due_value" },
  { name: "VALOR PAGO", attribute: "paid_value" }
];

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
    console.log("handlePDF");
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.text(title, 155, 25, null, null, "center");
    doc.table(4, 40, listagemExport, pdfColumns, { fontSize: 8, padding: 2 });
    doc.save(title);
  };

  const handleListagem = async () => {
    const params = {
      pageNumber,
      pageSize: 10,
      dateStart,
      dateEnd
    };

    const data = await ReportActions.financeiro(params);
    if (data) {
      setListagem(data);
    }

    const paramsExport = {
      dateStart,
      dateEnd
    };

    const dataExport = await ReportActions.financeiro(paramsExport);
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
                    handlePDF={handlePDF}
                    csvColumns={csvColumns}
                    listagemExport={listagemExport}
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
