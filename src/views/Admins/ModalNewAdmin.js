import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";
import Modal from "../../components/Modal";

const ModalNewAdmin = ({ modalOpened, setModalOpened, createAdmin }) => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Modal
      title="Novo Usuário"
      modalOpened={modalOpened}
      setModalOpened={setModalOpened}
    >
      <Form
        onSubmit={evt => {
          createAdmin({ firstname, lastname, phone, email, password });
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
            />
          </Col>
          <Col md="12">
            <label>Sobrenome</label>
            <Input
              required={true}
              placeholder="Informe o sobrenome"
              type="text"
              onChange={event => setLastname(event.target.value)}
            />
          </Col>
          <Col md="6">
            <label>E-mail</label>
            <Input
              required={true}
              placeholder="Informe o E-mail"
              type="email"
              onChange={event => setEmail(event.target.value)}
            />
          </Col>
          <Col md="6">
            <label>Telefone</label>
            <Input
              required={true}
              placeholder="Informe o Telefone"
              type="phone"
              onChange={event => setPhone(event.target.value)}
            />
          </Col>
          <Col md="12">
            <label>Senha</label>
            <Input
              required
              placeholder="Informe a senha"
              type="password"
              onChange={event => setPassword(event.target.value)}
            />
          </Col>
        </Row>
        <div className="custom-modal-footer">
          <Button
            color="secondary"
            onClick={() => setModalOpened(!modalOpened)}
          >
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

export default ModalNewAdmin;
