import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";
import Modal from "../../components/Modal";

const ModalCreate = ({ data, opened, setOpened, saveAction, updateAction }) => {
  const [id] = useState(data ? data.id : "");
  const [firstname, setFirstname] = useState(data ? data.firstname : "");
  const [lastname, setLastname] = useState(data ? data.lastname : "");
  const [phone, setPhone] = useState(data ? data.phone : "");
  const [email, setEmail] = useState(data ? data.email : "");
  const [password, setPassword] = useState();

  return (
    <Modal title="Administrador" opened={opened} setOpened={setOpened}>
      <Form
        onSubmit={evt => {
          if (!id) {
            saveAction({ firstname, lastname, phone, email, password });
          } else {
            updateAction({ id, firstname, lastname, phone, email, password });
          }
          evt.preventDefault();
        }}
      >
        <Row>
          <Col md="12">
            <label>Nome</label>
            <Input
              required={true}
              placeholder="Informe o nome"
              type="text"
              onChange={event => setFirstname(event.target.value)}
              value={firstname}
            />
          </Col>
          <Col md="12">
            <label>Sobrenome</label>
            <Input
              required={true}
              placeholder="Informe o sobrenome"
              type="text"
              onChange={event => {
                setLastname(event.target.value);
              }}
              value={lastname}
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
              placeholder="Informe o Telefone"
              type="phone"
              onChange={event => setPhone(event.target.value)}
              value={phone}
            />
          </Col>
          {!id && (
            <Col md="12">
              <label>Senha</label>
              <Input
                required
                placeholder="Informe a senha"
                type="password"
                onChange={event => setPassword(event.target.value)}
              />
            </Col>
          )}
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
  );
};

export default ModalCreate;
