import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";

import Modal from "../../../components/Modal";
import { formatPhone } from "../../../utils/Phone";

const ModalCreate = ({ data, opened, setOpened, handleSubmitForm }) => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState();
  const [plan_type, setPlanType] = useState();
  const [club_name, setClubName] = useState();

  useEffect(() => {
    if (data) {
      setId(data.id);
      setName(data.name);
      setPhone(formatPhone(data.phone));
      setStatus(data.status);
      setPlanType(data.Club.plan_type);
      setCity(data.Club && data.Club.city);
      setState(data.Club && data.Club.state);
      setClubName(data.Club && data.Club.name);
    }
  }, [data]);

  return (
    <>
      {opened && (
        <Modal
          className="modal fade bd-example-modal-lg"
          title="Organizador"
          opened={opened}
          setOpened={setOpened}
        >
          <Form
            onSubmit={evt =>
              handleSubmitForm(evt, {
                id,
                status,
                plan_type
              })
            }
            autoComplete="off"
          >
            <Row>
              <Col md="6">
                <label>Nome</label>
                <Input
                  disabled={true}
                  placeholder="Informe o nome"
                  type="text"
                  defaultValue={name || ""}
                />
              </Col>
              <Col md="6">
                <label>Telefone</label>
                <Input
                  disabled={true}
                  autoComplete="off"
                  placeholder="Informe o Telefone"
                  type="text"
                  defaultValue={phone || ""}
                />
              </Col>
              <Col md="12">
                <label>Nome da Pelada</label>
                <Input
                  disabled={true}
                  type="text"
                  defaultValue={club_name || ""}
                />
              </Col>
              <Col md="6">
                <label>Cidade</label>
                <Input disabled={true} type="text" defaultValue={city || ""} />
              </Col>
              <Col md="6">
                <label>Estado</label>
                <Input disabled={true} type="text" defaultValue={state || ""} />
              </Col>
              {data.id && data.Club && (
                <Col md="6">
                  <label>Tipo de Plano</label>
                  <select
                    name="select"
                    className="form-control"
                    onChange={event =>
                      setPlanType(event.target.value.toUpperCase())
                    }
                    value={plan_type || "30"}
                  >
                    <option value="30">30 JOGADORES</option>
                    <option value="60">60 JOGADORES</option>
                  </select>
                </Col>
              )}
              <Col md="6">
                <label>Status</label>
                <select
                  name="select"
                  className="form-control"
                  onChange={event =>
                    setStatus(event.target.value.toUpperCase())
                  }
                  value={status || "TESTE"}
                >
                  <option value="ATIVO">ATIVO</option>
                  <option value="INATIVO">INATIVO</option>
                  <option value="TESTE">TESTE</option>
                </select>
              </Col>
            </Row>
            <div className="custom-modal-footer">
              <Button color="secondary" onClick={() => setOpened(!opened)}>
                FECHAR
              </Button>
              <Button type="submit" color="primary">
                SALVAR
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ModalCreate;
