import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Input, Row } from "reactstrap";
import CurrencyInput from "react-currency-input";

import "./styles.css";
import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalUpdatePayment = ({
  data,
  opened,
  loading,
  setOpened,
  confirmAction
}) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [due_value, setDueValue] = useState(0);
  const [paid_value, setPaidValue] = useState(0);
  const [club_player_id, setClubPlayerID] = useState(0);

  useEffect(() => {
    if (data.name) {
      setId(data.id);
      setName(data.name);
      setPhone(data.phone);
      setDueValue(data.position === "COLABORADOR" ? 0 : Number(data.due_value));
      setPaidValue(Number(data.paid_value));
      setClubPlayerID(data.club_player_id);
    }
  }, [data]);

  return (
    <>
      {opened && (
        <Modal
          class="modal fade"
          title="Pagamento"
          opened={opened}
          setOpened={setOpened}
        >
          <Form
            onSubmit={evt => {
              confirmAction(evt, {
                id,
                due_value: String(due_value)
                  .replace("R$ ", "")
                  .replace(".", "")
                  .replace(",", "."),
                paid_value: String(paid_value)
                  .replace("R$ ", "")
                  .replace(".", "")
                  .replace(",", "."),
                club_player_id
              });
              evt.preventDefault();
            }}
          >
            <Row>
              <Col md="6">
                <label>Nome</label>
                <Input value={name || ""} disabled />
              </Col>
              <Col md="6">
                <label>Telefone</label>
                <Input value={phone || ""} disabled />
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <label>Valor Devido</label>
                <CurrencyInput
                  prefix="R$ "
                  className="form-control"
                  decimalSeparator=","
                  thousandSeparator="."
                  value={due_value}
                  onChangeEvent={event => {
                    setDueValue(event.target.value);
                  }}
                />
              </Col>
              <Col md="6">
                <label>Valor Pago</label>
                <CurrencyInput
                  className="form-control"
                  prefix="R$ "
                  decimalSeparator=","
                  thousandSeparator="."
                  value={paid_value}
                  onChangeEvent={event => {
                    setPaidValue(event.target.value);
                  }}
                />
              </Col>
            </Row>
            <div className="custom-modal-footer">
              <Button color="secondary" onClick={() => setOpened(!opened)}>
                Fechar
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading && <LoadingSpinner />}
                Salvar
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ModalUpdatePayment;
