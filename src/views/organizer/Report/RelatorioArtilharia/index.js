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
    width: 315,
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

const Relatorio = ({ season }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [listagem, setListagem] = useState();
  const [listagemExport, setListagemExport] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState();

  const handlePDF = () => {
    if (listagemExport && listagemExport.length > 0) {
      var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
      doc.text(title, 155, 25, null, null, "center");
      doc.table(4, 40, listagemExport, pdfColumns, { fontSize: 8, padding: 2 });
      doc.save(title);
    }
  };

  const handleListagem = async () => {
    console.log(selectedSeason)
    const params = {
      pageNumber,
      pageSize: 10,
      dateStart: selectedSeason.split('|')[0],
      dateEnd: selectedSeason.split('|')[1]
    };

    const data = await ReportActions.artilharia(params);
    if (data) {
      setListagem(data);
    }

    const paramsExport = {
      dateStart: selectedSeason.split('|')[0],
      dateEnd: selectedSeason.split('|')[1],
    };

    const dataExport = await ReportActions.artilharia(paramsExport);
    if (dataExport) {
      setListagemExport(dataExport.data);
    }
  };

  useEffect(() => {
    if (selectedSeason && isOpen) {
      handleListagem();
    }
  }, [selectedSeason, pageNumber, isOpen]);

  useEffect(() => {
    if (season && season.length) {
      const firstSeason = season[0];
      setSelectedSeason(`${firstSeason.date_start}|${firstSeason.date_end}`)
    }

  }, [season])

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
                    <label>TEMPORADA</label>
                    <select
                      name="select"
                      className="form-control"
                      onChange={event =>
                        setSelectedSeason(event.target.value)
                      }
                      value={selectedSeason || "30"}
                    >
                      {season && season.map(i => (
                        <option
                          value={`${i.date_start}|${i.date_end}`}
                        >
                          {`${i.name}: ${moment(i.date_start).format('DD/MM/YYYY')} - ${moment(i.date_end).format('DD/MM/YYYY')}`}
                        </option>

                      ))}
                    </select>
                  </FormGroup>
                </Col>
                <Col md="4" />
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
