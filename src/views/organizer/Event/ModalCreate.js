import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row, Input } from "reactstrap";
import Modal from "../../../components/Modal";

const ModalCreate = ({ data, opened, setOpened, handleSubmitForm }) => {
  const [id, setId] = useState();
  const [value, setValue] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (data.id) {
      setId(data.id);
      setValue(data.value);
      setDescription(data.description);
    }
  }, [data]);

  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="Evento de Partida"
          opened={opened}
          setOpened={setOpened}
        >
          <p className="text-center">INSERIR EVENTOS DE PARTIDA.</p>
          <Form
            onSubmit={evt => handleSubmitForm(evt, { id, value, description })}
          >
            <Row>
              <Col md="12">
                <label>Descrição</label>
                <Input
                  required={true}
                  placeholder="Informe o nome do evento"
                  type="text"
                  onChange={event =>
                    setDescription(event.target.value.toUpperCase())
                  }
                  value={description || ""}
                />
              </Col>
              <Col md="12">
                <label>Valor</label>
                <Input
                  required={true}
                  type="number"
                  placeholder="Informe o valor do evento"
                  onChange={event => {
                    setValue(event.target.value.toUpperCase());
                  }}
                  value={value}
                  step="0.01"
                />
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
