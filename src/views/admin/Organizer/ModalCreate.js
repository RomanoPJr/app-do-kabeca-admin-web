import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";

import Modal from "../../../components/Modal";
import { formatPhone, clearPhone } from "../../../utils/Phone";

const ModalCreate = ({ data, opened, setOpened, handleSubmitForm }) => {
  const [id] = useState(data.id ? data.id : null);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(data.name ? data.name : "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(data.email ? data.email : "");
  const [status, setStatus] = useState(data.status ? data.status : "TESTE");
  const [phone, setPhone] = useState(data.phone ? formatPhone(data.phone) : "");
  const [birth_date, setBirthDate] = useState(
    data.birth_date ? data.birth_date : ""
  );

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
            onSubmit={(evt) =>
              handleSubmitForm(evt, {
                id,
                name,
                phone: clearPhone(phone),
                email,
                status,
                password,
                birth_date,
                confirmPassword,
              })
            }
            autoComplete="off"
          >
            <Row>
              <Col md="12">
                <label>Nome</label>
                <Input
                  required={true}
                  placeholder="Informe o nome"
                  type="text"
                  onChange={(event) =>
                    setName(event.target.value.toUpperCase())
                  }
                  value={name}
                />
              </Col>
              <Col md="6">
                <label>E-mail</label>
                <Input
                  required={true}
                  placeholder="Informe o E-mail"
                  type="email"
                  onChange={(event) =>
                    setEmail(event.target.value.toUpperCase())
                  }
                  value={email}
                />
              </Col>
              <Col md="6">
                <label>Data de Nascimento</label>
                <Input
                  type="date"
                  required={true}
                  value={birth_date || ""}
                  placeholder="Informe a data de nascimento"
                  onChange={(event) => {
                    setBirthDate(event.target.value.toUpperCase());
                  }}
                />
              </Col>
              <Col md="6">
                <label>Telefone</label>
                <Input
                  required={true}
                  autoComplete="off"
                  placeholder="Informe o Telefone"
                  type="text"
                  onChange={(event) => setPhone(formatPhone(event))}
                  value={phone}
                />
              </Col>
              <Col md="6">
                <label>Status</label>
                <select
                  name="select"
                  className="form-control"
                  onChange={(event) =>
                    setStatus(event.target.value.toUpperCase())
                  }
                  value={status}
                >
                  <option value="ATIVO">ATIVO</option>
                  <option value="INATIVO">INATIVO</option>
                  <option value="TESTE">TESTE</option>
                </select>
              </Col>
              <Col md="6">
                <label>Senha</label>
                <Input
                  placeholder={
                    id
                      ? "Preencha apenas se desejar alterar a senha"
                      : "Informe a senha"
                  }
                  type="password"
                  onChange={(event) =>
                    setPassword(event.target.value.toUpperCase())
                  }
                />
              </Col>
              <Col md="6">
                <label>Confirmar Senha</label>
                <Input
                  required={password !== ""}
                  placeholder={
                    id
                      ? "Preencha apenas se desejar alterar a senha"
                      : "Informe a senha"
                  }
                  type="password"
                  onChange={(event) =>
                    setConfirmPassword(event.target.value.toUpperCase())
                  }
                />
              </Col>
            </Row>
            <div className="custom-modal-footer">
              <Button color="secondary" onClick={() => setOpened(!opened)}>
                Fechar
              </Button>
              <Button type="submit" color="primary">
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
