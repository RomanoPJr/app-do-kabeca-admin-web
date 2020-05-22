import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Input, Row } from "reactstrap";
import CurrencyInput from "react-currency-input";

import "./styles.css";
import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({
  data,
  opened,
  loading,
  setOpened,
  filterYear,
  filterMonth,
  confirmAction,
}) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState();
  const [referent, setReferent] = useState();
  const [due_value, setDueValue] = useState(0);
  const [paid_value, setPaidValue] = useState(0);
  const [club_player_id, setClubPlayerId] = useState();

  useEffect(() => {
    if (data.id) {
      setClubPlayerId(data.id);
      setName(data.User.name);

      if (data.MonthlyPayments.length > 0) {
        setId(data.MonthlyPayments[0].id);
        setReferent(data.MonthlyPayments[0].referent);
        setDueValue(data.MonthlyPayments[0].due_value);
        setPaidValue(data.MonthlyPayments[0].paid_value);
      } else {
        setPaidValue(data.monthly_payment);
        setDueValue(data.monthly_payment);
        setReferent(`${filterYear}-${filterMonth}-${new Date().getDate()}`);
      }
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
            onSubmit={(evt) => {
              evt.preventDefault();
              const cleanDue = String(due_value).replace('R$ ', '').replace('.', '').replace(',', '.')
              const cleanPaid = String(paid_value).replace('R$ ', '').replace('.', '').replace(',', '.')

              confirmAction(evt, {
                id,
                referent,
                due_value: cleanDue,
                paid_value: cleanPaid,
                club_player_id,
              });
            }}
          >
            <Row>
              <Col md="12">
                <label>Nome</label>
                <Input value={name || ""} disabled />
              </Col>
              <Col md="6">
                <label>Valor Devido</label>
                <CurrencyInput
                  prefix="R$ "
                  className="form-control"
                  decimalSeparator=","
                  thousandSeparator="."
                  value={due_value}
                  onChangeEvent={(event) => {
                    setDueValue(event.target.value)
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
                  onChangeEvent={(event) => {
                    setPaidValue(event.target.value)
                  }}
                />
              </Col>
              <Col md="6">
                <label>Referente à</label>
                <Input
                  type="date"
                  required={true}
                  value={referent || ""}
                  placeholder={"Informe a data de referência"}
                  onChange={(event) => {
                    setReferent(event.target.value.toUpperCase());
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

export default ModalCreate;
