import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Row, Input } from "reactstrap";
import { FaSave } from "react-icons/fa";

import Form from "../../../components/Form";
import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { handleToUppercase } from "../../../utils/InputHelpers";

const ModalCreate = ({ opened, setOpened, confirmAction }) => {
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
            <label>TIME A</label>
            <Input
              id="team_a"
              type="text"
              placeholder="TIME A"
              onChange={handleToUppercase}
              required
            />
          </Col>
          <Col md="6">
            <label>TIME B</label>
            <Input
              id="team_b"
              type="text"
              placeholder="TIME B"
              onChange={handleToUppercase}
              required
            />
          </Col>
          <Col md="6">
            <label>TIPO</label>
            <select
              id="type"
              type="select"
              defaultValue={""}
              className="form-control"
              required
            >
              <option hidden value="">
                SELECIONE
              </option>
              <option value="PARTIDA INTERNA">PARTIDA INTERNA</option>
              <option value="PARTIDA EXTERNA">PARTIDA EXTERNA</option>
            </select>
          </Col>
          <Col md="6">
            <label>DATA</label>
            <Input id="date" type="date" required />
          </Col>
          <Col md="6">
            <label>MODALIDADE</label>
            <select
              id="modality"
              type="select"
              className="form-control"
              defaultValue={""}
              required
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
              className="form-control"
              defaultValue={""}
              required
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
              min={0}
              placeholder="DURAÇÃO EM MINUTOS"
              required
            />
          </Col>
          <Col md="6">
            <label>JOGADORES POR TIME</label>
            <Input
              id="players_quantity"
              type="number"
              min={0}
              max={11}
              placeholder="JOGADORES POR TIME"
              required
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

export default ModalCreate;
