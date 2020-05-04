import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row, Input, Label, FormGroup } from "reactstrap";

import Modal from "../../../components/Modal";
import { formatPhone, clearPhone } from "../../../utils/Phone";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({
  data,
  user,
  opened,
  loading,
  setOpened,
  userLoading,
  confirmAction,
  handleFetchOneUser,
}) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [invite, setInvite] = useState();
  const [type, setType] = useState("JOGADOR");
  const [birth_date, setBirthDate] = useState();
  const [position, setPosition] = useState("GOLEIRO");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [disabledPlaceholder, setDisabledPlaceholder] = useState(false);

  useEffect(() => {
    if (data.id) {
      setId(data.ClubPlayers.id);
      setType(data.ClubPlayers.type);
      setInvite(data.ClubPlayers.invite);
      setInputDisabled(false);
      setName(data.name);
      setEmail(data.email);
      setPhone(formatPhone(data.phone));
      setPosition(data.ClubPlayers.position);
      setBirthDate(data.birth_date);
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBirthDate(user.birth_date);
    }
  }, [user]);

  useEffect(() => {
    if (userLoading) {
      setDisabledPlaceholder("Carregando...");
      setInputDisabled(true);
    } else if (!userLoading && !user && phone && phone.length >= 14) {
      setDisabledPlaceholder(false);
      setInputDisabled(false);
      setName();
      setEmail();
      setBirthDate(null);
    }
  }, [userLoading]);

  useEffect(() => {
    if (!data.id && phone && phone.length >= 14) {
      handleFetchOneUser({
        field: "phone",
        value: phone.replace(/\D/g, ""),
      });
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
                type,
                email,
                invite,
                position,
                birth_date,
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
                  placeholder="Informe o telefone"
                  onChange={(event) => {
                    setPhone(formatPhone(event.target.value));
                  }}
                />
              </Col>
              <Col md="6">
                <label>Nome</label>
                <Input
                  type="text"
                  required={true}
                  value={name || ""}
                  disabled={inputDisabled}
                  placeholder={disabledPlaceholder || "Informe o nome"}
                  onChange={(event) =>
                    setName(event.target.value.toUpperCase())
                  }
                />
              </Col>
              {/* <Col md="6">
                <label>E-mail</label>
                <Input
                  type="email"
                  required={true}
                  value={email || ""}
                  disabled={inputDisabled}
                  placeholder={disabledPlaceholder || "Informe o e-mail"}
                  onChange={(event) => {
                    setEmail(event.target.value.toUpperCase());
                  }}
                />
              </Col> */}
              <Col md="6">
                <label>Data de Nascimento</label>
                <Input
                  type="date"
                  value={birth_date || ""}
                  disabled={inputDisabled}
                  placeholder={
                    disabledPlaceholder || "Informe a data de nascimento"
                  }
                  onChange={(event) => {
                    setBirthDate(event.target.value.toUpperCase());
                  }}
                />
              </Col>
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
                </select>
              </Col>
              <Col md="6">
                <label>Tipo</label>
                <select
                  name="select"
                  className="form-control"
                  value={type || "JOGADOR"}
                  onChange={(event) =>
                    setType(event.target.value.toUpperCase())
                  }
                >
                  <option value="GOLEIRO">JOGADOR</option>
                  <option value="COLABORADOR">COLABORADOR</option>
                </select>
              </Col>
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