import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Row, Input } from "reactstrap";
import Modal from "../../../components/Modal";
import Form from "../../../components/Form";

const ModalCreate = ({ data, opened, setOpened, handleSubmitForm }) => {
  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="Evento de Partida"
          opened={opened}
          setOpened={setOpened}
        >
          <Form
            onSubmit={form => {
              if (data) {
                handleSubmitForm({ ...form, id: data.id });
              } else {
                handleSubmitForm(form);
              }
            }}
          >
            <Row>
              <Col md="12">
                <label>DESCRIÇÃO</label>
                <Input
                  id="description"
                  required={true}
                  placeholder="DESCRIÇÃO"
                  type="text"
                  defaultValue={data.description || ""}
                  onChange={v =>
                    (v.target.value = v.target.value.toUpperCase())
                  }
                />
              </Col>
              <Col md="12">
                <label>VALOR</label>
                <Input
                  id="value"
                  required={true}
                  type="number"
                  placeholder="VALOR"
                  defaultValue={data.value}
                  step="0.01"
                />
              </Col>
              <Col md="12">
                <label>COR</label>
                <select
                  id="type"
                  defaultValue={data.type || "EVENTO 1"}
                  className="form-control"
                >
                  <option value="EVENTO 1">AMARELO</option>
                  <option value="EVENTO 2">VERMELHO</option>
                  <option value="EVENTO 3">AZUL</option>
                  <option value="EVENTO 4">VERDE</option>
                  <option value="EVENTO 5">LARANJA</option>
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
