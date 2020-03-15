import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row, Input } from "reactstrap";
import Modal from "../../components/Modal";

const ModalCreate = ({
  data,
  opened,
  setOpened,
  createAction,
  updateAction
}) => {
  const [id] = useState(data ? data.id : "");
  const [description, setDescription] = useState(data ? data.description : "");
  const [value, setValue] = useState(data ? data.value : "");

  function handleSubmitForm(evt) {
    if (!id) {
      createAction({ description, value });
    } else {
      updateAction({ id, description, value });
    }
    evt.preventDefault();
  }

  return (
    <>
      {opened && (
        <Modal
          class="modal fade bd-example-modal-lg"
          title="Evento"
          opened={opened}
          setOpened={setOpened}
        >
          <Form onSubmit={evt => handleSubmitForm(evt)}>
            <Row>
              <Col md="12">
                <label>Descrição</label>
                <Input
                  required={true}
                  placeholder="Informe o nome do evento"
                  type="text"
                  onChange={event => setDescription(event.target.value)}
                  value={description}
                />
              </Col>
              <Col md="12">
                <label>Valor</label>
                <Input
                  required={true}
                  type="number"
                  placeholder="Informe o valor do evento"
                  onChange={event => {
                    setValue(event.target.value);
                  }}
                  value={value}
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
