import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row, Input } from "reactstrap";

import Modal from "../../../components/Modal";
import UploadInput from "../../../components/UploadInput";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({ data, opened, loading, setOpened, confirmAction }) => {
  const [id] = useState(data && data.id ? data.id : "");
  const [name, setName] = useState(data && data.name ? data.name : "");
  const [city, setCity] = useState(data && data.city ? data.city : "");
  const [time, setTime] = useState(data && data.time ? data.time : "");
  const [state, setState] = useState(data && data.state ? data.state : "");
  const [day, setDay] = useState(data && data.day ? data.day : "SEGUNDA-FEIRA");
  const [logo_url, setLogoUrl] = useState(
    data && data.logo_url ? data.logo_url : ""
  );
  const [payment_module_view_type, setPaymentModuleViewType] = useState(
    data && data.payment_module_view_type
      ? data.payment_module_view_type
      : "ALL"
  );

  return (
    <>
      {opened && (
        <Modal
          class="modal fade"
          title="Clube"
          opened={opened}
          setOpened={setOpened}
        >
          <Form
            onSubmit={(evt) =>
              confirmAction(evt, {
                id,
                day,
                name,
                city,
                time,
                state,
                logo_url,
                payment_module_view_type,
              })
            }
          >
            <Row>
              <Col md="12">
                <label>Nome</label>
                <Input
                  type="text"
                  required={true}
                  value={name || ""}
                  placeholder="Informe o nome"
                  onChange={(event) => {
                    setName(event.target.value.toUpperCase());
                  }}
                />
              </Col>
              <Col md="6">
                <label>Dia da pelada</label>
                <select
                  value={day || "SEGUNDA-FEIRA"}
                  name="select"
                  className="form-control"
                  onChange={(event) => setDay(event.target.value.toUpperCase())}
                >
                  <option value="SEGUNDA-FEIRA">SEGUNDA-FEIRA</option>
                  <option value="TERCA-FEIRA">TERÇA-FEIRA</option>
                  <option value="QUARTA-FEIRA">QUARTA-FEIRA</option>
                  <option value="QUINTA-FEIRA">QUINTA-FEIRA</option>
                  <option value="SEXTA-FEIRA">SEXTA-FEIRA</option>
                  <option value="SÁBADO">SÁBADO</option>
                  <option value="DOMINGO">DOMINGO</option>
                </select>
              </Col>
              <Col md="6">
                <label>Horário da Pelada</label>
                <Input
                  required
                  type="time"
                  value={time || ""}
                  placeholder="Informe o horário"
                  onChange={(event) =>
                    setTime(event.target.value.toUpperCase())
                  }
                />
              </Col>
              <Col md="6">
                <label>Cidade</label>
                <Input
                  required
                  type="text"
                  value={city || ""}
                  placeholder="Informe a cidade"
                  onChange={(event) =>
                    setCity(event.target.value.toUpperCase())
                  }
                />
              </Col>
              <Col md="6">
                <label>Estado</label>
                <Input
                  required
                  type="text"
                  value={state || ""}
                  placeholder="Informe o estado"
                  onChange={(event) =>
                    setState(event.target.value.toUpperCase())
                  }
                />
              </Col>
              <Col md="12">
                <label>Módulo de Pagamento (Tipo de Visualização)</label>
                <select
                  name="select"
                  className="form-control"
                  value={payment_module_view_type || "INDIVIDUAL"}
                  onChange={(event) =>
                    setPaymentModuleViewType(event.target.value.toUpperCase())
                  }
                >
                  <option value="ALL">TODOS</option>
                  <option value="INDIVIDUAL">INDIVIDUAL</option>
                </select>
              </Col>
              <Col md="12" style={{ display: "flex", flexDirection: "column" }}>
                <label>
                  Logotipo da Pelada (Tamanho Recomendado: 512px x 512px)
                </label>

                <UploadInput
                  text="Upload"
                  onLoad={(base64) => {
                    setLogoUrl(base64);
                  }}
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
