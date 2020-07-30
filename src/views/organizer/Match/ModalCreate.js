import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row, Input } from "reactstrap";

import Modal from "../../../components/Modal";
import UploadInput from "../../../components/UploadInput";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({ data, opened, loading, setOpened, confirmAction }) => {
  const [id] = useState(data && data.id ? data.id : null);
  const [name, setName] = useState(data && data.name ? data.name : "");
  const [value, setValue] = useState(data && data.value ? data.value : "");
  const [banner_url, setBannerUrl] = useState(
    data && data.banner_url ? data.banner_url : ""
  );
  const [status, setStatus] = useState(
    data && data.status ? data.status : "ATIVO"
  );
  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="Partida"
          opened={opened}
          setOpened={setOpened}
        >
          <Form
            onSubmit={evt =>
              confirmAction(evt, { id, value, name, status, banner_url })
            }
          >
            <Row>
              <Col md="6">
                <label>TIME A</label>
                <Input type="text" placeholder="TIME A" />
              </Col>
              <Col md="6">
                <label>TIME B</label>
                <Input type="text" placeholder="TIME B" />
              </Col>
              <Col md="6">
                <label>TIPO</label>
                <select type="select" className="form-control">
                  <option disabled selected>
                    SELECIONE
                  </option>
                  <option value="PARTIDA_INTERNA">PARTIDA INTERNA</option>
                  <option value="PARDTIDA_EXTERNA">PARDTIDA_EXTERNA</option>
                </select>
              </Col>
              <Col md="6">
                <label>DATA</label>
                <Input type="date" />
              </Col>
              <Col md="6">
                <label>HORÁRIO DE INÍCIO</label>
                <Input type="time" />
              </Col>
              <Col md="6">
                <label>HORÁRIO FINAL</label>
                <Input type="time" placeholder="00:00" />
              </Col>
              <Col md="6">
                <label>MODALIDADE</label>
                <select type="select" className="form-control">
                  <option disabled selected>
                    SELECIONE
                  </option>
                  <option value="1_TEMPO">1 TEMPO</option>
                  <option value="2_TEMPO">2 TEMPOS</option>
                </select>
              </Col>
              <Col md="6">
                <label>PONTUAÇÃO</label>
                <select type="select" className="form-control">
                  <option disabled selected>
                    SELECIONE
                  </option>
                  <option value="RANKEADA">RANKEADA</option>
                  <option value="NAO_RANKEADA">NÃO RANKEADA</option>
                </select>
              </Col>
              <Col md="6">
                <label>DURAÇÃO (MINUTOS)</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder="DURAÇÃO EM MINUTOS"
                />
              </Col>
              <Col md="6">
                <label>JOGADORES POR TIME</label>
                <input
                  type="number"
                  min={0}
                  max={11}
                  className="form-control"
                  placeholder="NUMERO DE JOGADORES POR TIME"
                />
              </Col>
            </Row>
            <div className="custom-modal-footer">
              <Button color="secondary" onClick={() => setOpened(!opened)}>
                Fechar
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading && <LoadingSpinner />}
                Salvar
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ModalCreate;
