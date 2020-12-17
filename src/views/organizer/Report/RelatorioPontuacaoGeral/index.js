import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Collapse, FormGroup, Input } from "reactstrap";
import "../styles.css";
import Table from "../../../../components/Table";
import CardHeader from "../../../../components/CardHeader";
import ReportActions from "../../../../store/report/report.actions";
import BtnAction from "../Components/BtnAction";
import { jsPDF } from "jspdf";
import moment from "moment";
import EventActions from "../../../../store/event/event.actions";

const Relatorio = ({ club, season }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [listagem, setListagem] = useState();
  const [listagemExport, setListagemExport] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [eventos, setEventos] = useState(false);
  const [csvColumns, setCsvColumns] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState();

  const title = "RELATÓRIO DE PONTUAÇÃO GERAL";

  const Cor = ({ cor }) => (
    <div
      style={{
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: cor
      }}
    />
  );

  const getEventoNome = evento => {
    if (eventos) {
      const finded = eventos.find(i => {
        switch (evento) {
          case "evento_1":
            return i.type === "EVENTO 1";
          case "evento_2":
            return i.type === "EVENTO 2";
          case "evento_3":
            return i.type === "EVENTO 3";
          case "evento_4":
            return i.type === "EVENTO 4";
          case "evento_5":
            return i.type === "EVENTO 5";
          default:
            return false;
        }
      });

      if (finded) {
        return finded.description;
      } else {
        return "Teste";
      }
    }
  };

  const columns = [
    { name: "JOGADOR", attribute: "name" },
    { name: "POSICAO", attribute: "position" },
    {
      name: "TOTAL DE PONTOS",
      render: ({ data }) => <b style={{ color: "red" }}>{data.total_pontos}</b>
    },
    { name: "J", attribute: "qtd_jogos" },
    { name: "V", attribute: "vitorias" },
    { name: "E", attribute: "empates" },
    { name: "D", attribute: "derrotas" },
    { name: <Cor cor="yellow" />, attribute: "evento_1" },
    { name: <Cor cor="red" />, attribute: "evento_2" },
    { name: <Cor cor="blue" />, attribute: "evento_3" },
    { name: <Cor cor="green" />, attribute: "evento_4" },
    { name: <Cor cor="orange" />, attribute: "evento_5" }
  ];

  const pdfColumns = [
    {
      id: "name",
      name: "name",
      prompt: "JOGADOR",
      width: 100,
      align: "left"
    },
    {
      id: "position",
      name: "position",
      prompt: "POSICÃO",
      width: 30,
      align: "center"
    },
    {
      id: "qtd_jogos",
      name: "qtd_jogos",
      prompt: "QUANTIDADE DE JOGOS",
      width: 30,
      align: "center"
    },
    {
      id: "total_pontos",
      name: "total_pontos",
      prompt: "PONTOS",
      width: 25,
      align: "center"
    },
    {
      id: "vitorias",
      name: "vitorias",
      prompt: "VITÓRIAS",
      width: 25,
      align: "center"
    },
    {
      id: "empates",
      name: "empates",
      prompt: "EMPATES",
      width: 25,
      align: "center"
    },
    {
      id: "derrotas",
      name: "derrotas",
      prompt: "DERROTAS",
      width: 25,
      align: "center"
    },
    {
      id: "evento_1",
      name: "evento_1",
      prompt: getEventoNome("evento_1"),
      width: 25,
      align: "center"
    },
    {
      id: "evento_2",
      name: "evento_2",
      prompt: getEventoNome("evento_2"),
      width: 25,
      align: "center"
    },
    {
      id: "evento_3",
      name: "evento_3",
      prompt: getEventoNome("evento_3"),
      width: 25,
      align: "center"
    },
    {
      id: "evento_4",
      name: "evento_4",
      prompt: getEventoNome("evento_4"),
      width: 25,
      align: "center"
    },
    {
      id: "evento_5",
      name: "evento_5",
      prompt: getEventoNome("evento_5"),
      width: 25,
      align: "center"
    }
  ];

  const handlePDF = () => {
    if (listagemExport && listagemExport.length > 0) {
      var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
      doc.text(title, 155, 25, { align: "center" }, null, "center");
      doc.table(4, 40, listagemExport, pdfColumns, {
        fontSize: 7,
        padding: 2
      });
      doc.save(title);
    }
  };

  const handleListagem = async () => {
    const params = {
      pageNumber,
      pageSize: 10,
      dateStart: moment(selectedSeason.split('|')[0]),
      dateEnd: moment(selectedSeason.split('|')[1])
    };

    const data = await ReportActions.pontuacaoGeral(params);
    if (data) {
      setListagem(data);
    }

    const paramsExport = {
      dateStart: moment(selectedSeason.split('|')[0]),
      dateEnd: moment(selectedSeason.split('|')[1])
    };

    const dataExport = await ReportActions.pontuacaoGeral(paramsExport);
    if (dataExport) {
      dataExport.data.map(i => {
        i.total_pontos = i.total_pontos + "";
      });
      setListagemExport(dataExport.data);
    }

    const eventosResponse = await EventActions.fetch2();
    setEventos(eventosResponse.data);
  };

  useEffect(() => {
    if (eventos) {
      setCsvColumns([
        { displayName: "JOGADOR", id: "name" },
        { displayName: "POSICAO", id: "position" },
        { displayName: "QUANTIDADE DE JOGOS", id: "qtd_jogos" },
        { displayName: "TOTAL DE PONTOS", id: "total_pontos" },
        { displayName: "V", id: "vitorias" },
        { displayName: "E", id: "empates" },
        { displayName: "D", id: "derrotas" },
        { displayName: getEventoNome("evento_1"), id: "evento_1" },
        { displayName: getEventoNome("evento_2"), id: "evento_2" },
        { displayName: getEventoNome("evento_3"), id: "evento_3" },
        { displayName: getEventoNome("evento_4"), id: "evento_4" },
        { displayName: getEventoNome("evento_5"), id: "evento_5" }
      ]);
    }
  }, [eventos]);

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
