import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row, Input } from "reactstrap";
import Modal from "../../../components/Modal";

const ModalCreate = ({
  data,
  opened,
  setOpened,
  suggestion_event,
  handleSubmitForm,
}) => {
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

  function handleSetSugestion(selectedOption) {
    setDescription(selectedOption.text.toUpperCase());
    setValue(selectedOption.value);
  }

  return (
    <>
      {opened && (
        <Modal
          class="modal fade"
          title="Evento"
          opened={opened}
          setOpened={setOpened}
        >
          {!id && (
            <p className="text-center">
              Selecione uma sugestão de evento ou crie um.
            </p>
          )}
          <Form
            onSubmit={(evt) =>
              handleSubmitForm(evt, { id, value, description })
            }
          >
            <Row>
              {!id && (
                <Col md="12">
                  <label>Sugestões</label>
                  <select
                    name="select"
                    className="form-control"
                    onChange={({ target: { selectedIndex, options } }) => {
                      handleSetSugestion(options[selectedIndex]);
                    }}
                  >
                    <option> SELECIONE... </option>
                    {suggestion_event.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.description}
                      </option>
                    ))}
                  </select>
                </Col>
              )}
              <Col md="12">
                <label>Descrição</label>
                <Input
                  required={true}
                  placeholder="Informe o nome do evento"
                  type="text"
                  onChange={(event) =>
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
                  onChange={(event) => {
                    setValue(event.target.value.toUpperCase());
                  }}
                  value={value}
                  step="0.01"
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
