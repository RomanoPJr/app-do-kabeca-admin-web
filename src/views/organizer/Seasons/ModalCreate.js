import React, { useState } from "react";
import { Button, Col, Form, Row, Input } from "reactstrap";

import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({ data, opened, loading, setOpened, confirmAction }) => {
  const [id] = useState(data && data.id ? data.id : null);
  const [name, setName] = useState(data && data.name ? data.name : "");
  const [dateStart, setDateStart] = useState(data && data.date_start ? data.date_start : "");
  const [dateEnd, setDateEnd] = useState(data && data.date_end ? data.date_end : "");

  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="Patrocinador"
          opened={opened}
          setOpened={setOpened}
        >
          <Form
            onSubmit={evt =>
              confirmAction(evt, { id, name, date_start: dateStart, date_end: dateEnd })
            }
          >
            <Row>
              <Col md="12">
                <label>Nome</label>
                <Input
                  required={true}
                  placeholder="Informe o nome da temporada"
                  type="text"
                  value={name || ""}
                  onChange={event => setName(event.target.value.toUpperCase())}
                />
              </Col>
              <Col md="12">
                <label>Data de início:</label>
                <Input
                  type="date"
                  value={dateStart || ""}
                  onChange={event =>
                    setDateStart(event.target.value.toUpperCase())
                  }
                />
              </Col>
              <Col md="12">
                <label>Data de fim:</label>
                <Input
                  type="date"
                  value={dateEnd || ""}
                  onChange={event =>
                    setDateEnd(event.target.value.toUpperCase())
                  }
                />
              </Col>
            </Row>
            <div className="custom-modal-footer">
              <Button color="secondary" onClick={() => setOpened(!opened)}>
                FECHAR
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading && <LoadingSpinner />}
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
