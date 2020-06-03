import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row, Input, Label, FormGroup } from "reactstrap";

import ModalConfirm from "./ModalConfirm";
import Modal from "../../../components/Modal";
import { formatPhone, clearPhone } from "../../../utils/Phone";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({
  data,
  user,
  opened,
  loading,
  setOpened,
  confirmAction,
  handleFetchOneUser,
  resetPasswordAction,
}) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [invite, setInvite] = useState();
  const [birth_date, setBirthDate] = useState();
  const [position, setPosition] = useState("GOLEIRO");
  const [monthly_payment, setMonthlyPayment] = useState(0);
  const [modalConfirmOpened, setModalConfirmOpened] = useState(false);

  useEffect(() => {
    if (data.id) {
      setName(data.name);
      setBirthDate(data.birth_date);
      setPhone(formatPhone(data.phone));

      setId(data.ClubPlayers.id);
      setInvite(data.ClubPlayers.invite);
      setPosition(data.ClubPlayers.position);
      setMonthlyPayment(data.ClubPlayers.monthly_payment);
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBirthDate(user.birth_date);
    }
  }, [user]);

  useEffect(() => {
    if (phone && phone.length >= 14) {
      handleFetchOneUser({
        field: "phone",
        value: phone.replace(/\D/g, ""),
      });
    } else if (phone && phone.length < 14) {
      setName();
      setBirthDate(null);
    }
  }, [phone]);

  return (
    <>
      {opened && (
        <Modal
          class="modal fade"
          title="Jogador"
          opened={opened}
          setOpened={setOpened}
        >
          <Form
            onSubmit={(evt) => {
              confirmAction(evt, {
                id,
                name,
                invite,
                position,
                monthly_payment,
                phone: clearPhone(phone),
              });
            }}
          >
            <Row>
              <Col md="12">
                <label>Telefone</label>
                <Input
                  type="text"
                  value={phone || ""}
                  maxLength="15"
                  required={true}
                  disabled={data && data.id}
                  placeholder="Informe o telefone"
                  onChange={(event) => {
                    setPhone(formatPhone(event));
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <label>Nome</label>
                <Input
                  type="text"
                  value={name || ""}
                  onChange={event => setName(event.target.value.toUpperCase())}
                  disabled={(data && data.id) || (user)}
                />
              </Col>
              <Col md="6">
                <label>Data de Nascimento</label>
                <Input
                  type="date"
                  value={birth_date || ""}
                  disabled={true}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <label>Posição</label>
                <select
                  name="select"
                  className="form-control"
                  value={position || "GOLEIRO"}
                  onChange={(event) =>
                    setPosition(event.target.value.toUpperCase())
                  }
                >
                  <option value="GOLEIRO">GOLEIRO</option>
                  <option value="DEFESA">DEFESA</option>
                  <option value="MEIO">MEIO</option>
                  <option value="ATAQUE">ATAQUE</option>
                  <option value="COLABORADOR">COLABORADOR</option>
                </select>
              </Col>
              {position && position !== 'COLABORADOR' && (
                <Col md="6">
                  <label>Valor da Mensalidade (R$)</label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Informe o valor da mensalidade"
                    value={monthly_payment || "0.00"}
                    onChange={(event) =>
                      setMonthlyPayment(event.target.value.toUpperCase())
                    }
                  />
                </Col>
              )}
            </Row>
            <Row>
              {data.id &&
                data.invite &&
                (data.invite === "ACEITO" || data.invite === "BLOQUEADO") && (
                  <Col md="12">
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          checked={invite === "BLOQUEADO" || false}
                          onChange={(event) => {
                            setInvite(
                              event.target.checked ? "BLOQUEADO" : "ACEITO"
                            );
                          }}
                        />{" "}
                        Bloqueado?
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>
                )}
              {data.id && (
                <Col
                  md="6"
                  style={{
                    display: "block",
                  }}
                >
                  <Button
                    className="btn"
                    type="button"
                    color="danger"
                    style={{ width: "100%", marginTop: 15 }}
                    onClick={() => {
                      setModalConfirmOpened(true);
                    }}
                  >
                    Resetar Senha
                  </Button>
                </Col>
              )}
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
          {modalConfirmOpened && (
            <ModalConfirm
              loading={loading}
              opened={modalConfirmOpened}
              action={() => resetPasswordAction(data.ClubPlayers.id)}
              setOpened={setModalConfirmOpened}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default ModalCreate;
