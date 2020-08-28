import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Row, Input } from "reactstrap";
import { FaSave } from "react-icons/fa";

import Form from "../../../../../../components/Form";
import Modal from "../../../../../../components/Modal";
import LoadingSpinner from "../../../../../../components/LoadingSpinner";
import { handleToUppercase } from "../../../../../../utils/InputHelpers";

export default ({ data, opened, setOpened, confirmAction }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      title="PARTIDA"
      opened={opened}
      setOpened={setOpened}
      className="modal fade"
    >
      <Form
        onSubmit={async form => {
          setLoading(true);
          await confirmAction(form);
          setLoading(false);
        }}
      >
        <Row>
          <Col md="6">
            <Input id="id" type="hidden" defaultValue={data.id} />
            <label>TIME A</label>
            <Input
              id="team_a"
              defaultValue={data.team_a || ""}
              type="text"
              placeholder="TIME A"
              onChange={handleToUppercase}
            />
          </Col>
          <Col md="6">
            <label>TIME B</label>
            <Input
              defaultValue={data.team_b || ""}
              id="team_b"
              type="text"
              placeholder="TIME B"
              onChange={handleToUppercase}
            />
          </Col>
          {/* <Col md="6">
            <label>TIPO</label>
            <select
              id="type"
              type="select"
              defaultValue={""}
              className="form-control"
            >
              <option hidden value="">
                SELECIONE
              </option>
              <option value="PARTIDA INTERNA">PARTIDA INTERNA</option>
              <option value="PARTIDA EXTERNA">PARTIDA EXTERNA</option>
            </select>
          </Col> */}
          <Col md="6">
            <label>DATA</label>
            <Input id="date" type="date" defaultValue={data.date || ""} />
          </Col>
          <Col md="6">
            <label>MODALIDADE</label>
            <select
              id="modality"
              defaultValue={data.modality || ""}
              type="select"
              className="form-control"
            >
              <option disabled hidden value="">
                SELECIONE
              </option>
              <option value="1 TEMPO">1 TEMPO</option>
              <option value="2 TEMPOS">2 TEMPOS</option>
            </select>
          </Col>
          <Col md="6">
            <label>PONTUAÇÃO</label>
            <select
              id="score_type"
              type="select"
              defaultValue={data.score_type || ""}
              className="form-control"
            >
              <option disabled hidden value="">
                SELECIONE
              </option>
              <option value="RANKEADA">RANKEADA</option>
              <option value="NÃO RANKEADA">NÃO RANKEADA</option>
            </select>
          </Col>
          <Col md="6">
            <label>DURAÇÃO (MINUTOS)</label>
            <Input
              id="duration"
              type="number"
              defaultValue={data.duration || ""}
              min={0}
              placeholder="DURAÇÃO EM MINUTOS"
            />
          </Col>
          <Col md="6">
            <label>JOGADORES POR TIME</label>
            <Input
              id="players_quantity"
              type="number"
              defaultValue={data.players_quantity || ""}
              min={0}
              max={11}
              placeholder="JOGADORES POR TIME"
            />
          </Col>
        </Row>
        <div className="custom-modal-footer">
          <Button
            className="btn btn-close-modal"
            onClick={() => setOpened(!opened)}
          >
            FECHAR
          </Button>
          <Button
            className="btn btn-save"
            type="submit"
            color="primary"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : <FaSave />}
            SALVAR
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
