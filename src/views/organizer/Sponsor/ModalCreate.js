import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row, Input } from "reactstrap";

import Modal from "../../../components/Modal";
import UploadInput from "../../../components/UploadInput";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({ data, opened, loading, setOpened, confirmAction }) => {
  const [id] = useState(data && data.id ? data.id : null);
  const [name, setName] = useState(data && data.name ? data.name : "");
  const [value, setValue] = useState(data && data.value ? data.value : "");
  const [banner_url, setBannerUrl] = useState(
    data && data.banner_url ? data.banner_url : ""
  );
  const [status, setStatus] = useState(
    data && data.status ? data.status : "ATIVO"
  );
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
              confirmAction(evt, { id, value, name, status, banner_url })
            }
          >
            <Row>
              <Col md="12">
                <label>Nome</label>
                <Input
                  required={true}
                  placeholder="Informe o nome do patrocinador"
                  type="text"
                  value={name || ""}
                  onChange={event => setName(event.target.value.toUpperCase())}
                />
              </Col>
              <Col md="12">
                <label>Valor (R$)</label>
                <Input
                  required={true}
                  type="number"
                  placeholder="Informe o valor de patrocínio"
                  value={value}
                  step="0.01"
                  onChange={event => {
                    setValue(event.target.value.toUpperCase());
                  }}
                />
              </Col>
              <Col md="12">
                <label>Status</label>
                <select
                  name="select"
                  className="form-control"
                  onChange={event => {
                    setStatus(event.target.value.toUpperCase());
                  }}
                >
                  <option value="ATIVO">ATIVO</option>
                  <option value="INATIVO">INATIVO</option>
                </select>
              </Col>
              <Col md="6" style={{ display: "flex", flexDirection: "column" }}>
                <label>Banner do Patrocinador</label>
                <UploadInput
                  imagePreview={banner_url}
                  onLoad={base64 => {
                    setBannerUrl(base64);
                  }}
                  text="Upload"
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
