import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Collapse } from "reactstrap";
import "../styles.css";
import Table from "../../../../components/Table";
import CardHeader from "../../../../components/CardHeader";
import ReportActions from "../../../../store/report/report.actions";
import BtnAction from "../Components/BtnAction";
import { jsPDF } from "jspdf";

const title = "RELATÓRIO DE JOGADORES";

const columns = [
  { name: "JOGADOR", attribute: "name" },
  { name: "POSICAO", attribute: "position" },
  { name: "MENSALIDADE", attribute: "monthly_payment" },
  { name: "E-MAIL", attribute: "email" },
  { name: "TELEFONE", attribute: "phone" },
  { name: "DATA DE NASCIMENTO", attribute: "birth_date" },
  { name: "ENTROU EM", attribute: "created_at" }
];

const csvColumns = [
  { displayName: "JOGADOR", id: "name" },
  { displayName: "POSICAO", id: "position" },
  { displayName: "MENSALIDADE", id: "monthly_payment" },
  { displayName: "E-MAIL", id: "email" },
  { displayName: "TELEFONE", id: "phone" },
  { displayName: "DATA DE NASCIMENTO", id: "birth_date" },
  { displayName: "ENTROU EM", id: "created_at" }
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
    prompt: "POSICAO",
    width: 40,
    align: "center"
  },
  {
    id: "monthly_payment",
    name: "monthly_payment",
    prompt: "MENSALIDADE",
    width: 40,
    align: "center"
  },
  {
    id: "email",
    name: "email",
    prompt: "E-MAIL",
    width: 40,
    align: "center"
  },
  {
    id: "phone",
    name: "phone",
    prompt: "TELEFONE",
    width: 40,
    align: "center"
  },
  {
    id: "birth_date",
    name: "birth_date",
    prompt: "DATA DE NASCIMENTO",
    width: 40,
    align: "center"
  },
  {
    id: "created_at",
    name: "created_at",
    prompt: "ENTROU EM",
    width: 40,
    align: "center"
  }
];

const Relatorio = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [listagem, setListagem] = useState();
  const [listagemExport, setListagemExport] = useState();
  const [isOpen, setIsOpen] = useState(false);

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
      pageSize: 10
    };

    const data = await ReportActions.jogadores(params);
    if (data) {
      setListagem(data);
    }

    const paramsExport = {};

    const dataExport = await ReportActions.jogadores(paramsExport);
    if (dataExport) {
      setListagemExport(dataExport.data);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleListagem();
    }
  }, [pageNumber, isOpen]);

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
                <Col
                  md="12"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingTop: 13
                  }}
                >
                  <BtnAction
                    handlePDF={handlePDF}
                    title={title}
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
