import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Collapse, FormGroup, Input } from "reactstrap";
import "../styles.css";
import Table from "../../../../components/Table";
import CardHeader from "../../../../components/CardHeader";
import ReportActions from "../../../../store/report/report.actions";
import BtnAction from "../Components/BtnAction";
import { jsPDF } from "jspdf";
import moment from "moment";

const title = "RELATÓRIO DE PONTUAÇÃO GERAL";

const columns = [
  { name: "JOGADOR", attribute: "name" },
  { name: "POSICAO", attribute: "position" },
  { name: "QUANTIDADE DE JOGOS", attribute: "qtd_jogos" },
  { name: "TOTAL DE PONTOS", attribute: "total_pontos" },
  { name: "VITÓRIAS", attribute: "vitorias" },
  { name: "EMPATES", attribute: "empates" },
  { name: "DERROTAS", attribute: "derrotas" }
];

const csvColumns = [
  { displayName: "JOGADOR", id: "name" },
  { displayName: "POSICAO", id: "position" },
  { displayName: "QUANTIDADE DE JOGOS", id: "qtd_jogos" },
  { displayName: "TOTAL DE PONTOS", id: "total_pontos" },
  { displayName: "VITÓRIAS", id: "vitorias" },
  { displayName: "EMPATES", id: "empates" },
  { displayName: "DERROTAS", id: "derrotas" }
];

const pdfColumns = [
  {
    id: "name",
    name: "name",
    prompt: "JOGADOR",
    width: 140,
    align: "left"
  },
  {
    id: "position",
    name: "position",
    prompt: "POSICÃO",
    width: 40,
    align: "center"
  },
  {
    id: "qtd_jogos",
    name: "qtd_jogos",
    prompt: "QUANTIDADE DE JOGOS",
    width: 40,
    align: "center"
  },
  {
    id: "total_pontos",
    name: "total_pontos",
    prompt: "PONTOS",
    width: 40,
    align: "center"
  },
  {
    id: "vitorias",
    name: "vitorias",
    prompt: "VITÓRIAS",
    width: 40,
    align: "center"
  },
  {
    id: "empates",
    name: "empates",
    prompt: "EMPATES",
    width: 40,
    align: "center"
  },
  {
    id: "derrotas",
    name: "derrotas",
    prompt: "DERROTAS",
    width: 40,
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
    doc.text(title, 155, 25, { align: "center" }, null, "center");
    doc.table(4, 40, listagemExport, pdfColumns, {
      fontSize: 8,
      padding: 2
    });
    doc.save(title);
  };

  const handleListagem = async () => {
    const params = {
      pageNumber,
      pageSize: 5,
      dateStart,
      dateEnd
    };

    const data = await ReportActions.pontuacaoGeral(params);
    if (data) {
      setListagem(data);
    }

    const paramsExport = {};

    const dataExport = await ReportActions.pontuacaoGeral(paramsExport);
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
