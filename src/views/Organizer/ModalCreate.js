import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Input, Row } from "reactstrap";
import Modal from "../../components/Modal";

const ModalCreate = ({
  data,
  opened,
  setOpened,
  createAction,
  updateAction
}) => {
  const [id] = useState(data ? data.id : "");
  const [name, setName] = useState(data.name ? data.name : "");
  const [phone, setPhone] = useState(data.phone ? data.phone : "");
  const [email, setEmail] = useState(data.email ? data.email : "");
  const [status, setStatus] = useState(data.status ? data.status : "Tester");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmitForm(evt) {
    if (!id) {
      createAction({ name, phone, email, password, status });
    } else {
      updateAction({
        id,
        name,
        phone,
        email,
        password,
        oldPassword,
        confirmPassword,
        status
      });
    }
    evt.preventDefault();
  }

  return (
    <>
      {opened && (
        <Modal
          className="modal fade bd-example-modal-lg"
          title="Organizador"
          opened={opened}
          setOpened={setOpened}
        >
          <Form onSubmit={evt => handleSubmitForm(evt)} autoComplete="off">
            <Row>
              <Col md="12">
                <label>Nome</label>
                <Input
                  required={true}
                  placeholder="Informe o nome"
                  type="text"
                  onChange={event => setName(event.target.value)}
                  value={name}
                />
              </Col>
              <Col md="6">
                <label>E-mail</label>
                <Input
                  required={true}
                  placeholder="Informe o E-mail"
                  type="email"
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                />
              </Col>
              <Col md="6">
                <label>Telefone</label>
                <Input
                  required={true}
                  autoComplete="off"
                  placeholder="Informe o Telefone"
                  type="text"
                  onChange={event => setPhone(event.target.value)}
                  value={phone}
                />
              </Col>
              {id && (
                <Col md="12">
                  <label>Senha Anterior</label>
                  <Input
                    required={password !== "" || confirmPassword !== ""}
                    placeholder={
                      !id
                        ? "Informe a senha"
                        : "Preencha apenas se desejar alterar a senha"
                    }
                    type="password"
                    onChange={event => setOldPassword(event.target.value)}
                  />
                </Col>
              )}
              <Col md={!id ? 12 : 6}>
                <label>{!id ? "Senha" : "Nova Senha"}</label>
                <Input
                  required={!id || oldPassword !== "" || confirmPassword !== ""}
                  placeholder={
                    !id
                      ? "Informe a senha"
                      : "Preencha apenas se desejar alterar a senha"
                  }
                  type="password"
                  onChange={event => setPassword(event.target.value)}
                />
              </Col>
              {id && (
                <Col md={!id ? 12 : 6}>
                  <label>Confirmar Senha</label>
                  <Input
                    required={password !== "" || oldPassword !== ""}
                    placeholder={
                      !id
                        ? "Informe a senha"
                        : "Preencha apenas se desejar alterar a senha"
                    }
                    type="password"
                    onChange={event => setConfirmPassword(event.target.value)}
                  />
                </Col>
              )}
              <Col md="12">
                <label>Status</label>
                <select
                  name="select"
                  className="form-control"
                  onChange={event => setStatus(event.target.value)}
                  value={status}
                >
                  <option value="Ativo">ATIVO</option>
                  <option value="Inativo">INATIVO</option>
                  <option value="Tester">TESTE</option>
                </select>
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
