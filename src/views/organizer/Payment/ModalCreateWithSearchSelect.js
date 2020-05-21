import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import { Button, Col, Form, Input, Row } from "reactstrap";

import "./styles.css";
import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({
  data,
  opened,
  loading,
  playerList,
  setOpened,
  playerLoading,
  fetchPlayer,
  confirmAction,
}) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState();
  const [value, setValue] = useState();
  const [referent, setReferent] = useState();
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    if (data.id) {
      setId(data.id);
      setValue(data.value);
      setReferent(data.referent);

      if (data.User.name) {
        setSelectedOption({ label: data.User.name, value: data.User.id });
      }
    }
  }, [data]);

  useEffect(() => {
    if (playerList) {
      const users = playerList.map((user) => ({
        value: user.User.id,
        label: user.User.name,
      }));
      setSelectOptions(users);
    }
  }, [playerList]);

  useEffect(() => {
    if (name && name.length >= 3) {
      fetchPlayer({
        field: "name",
        value: name.toUpperCase(),
      });
    }
  }, [name]);

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
              confirmAction(evt, {
                id,
                value,
                user_id: selectedOption.value,
                referent,
              });
            }}
          >
            <Row>
              <Col md="12">
                <label>Nome</label>
                <Select
                  value={selectedOption || ""}
                  classNamePrefix="select"
                  isLoading={playerLoading}
                  isSearchable={true}
                  name="color"
                  placeholder="Digite o nome do jogador"
                  options={selectOptions}
                  onChange={setSelectedOption}
                  onInputChange={(value) => {
                    setName(value.toUpperCase());
                  }}
                />
              </Col>
              <Col md="6">
                <label>Valor</label>
                <Input
                  required={true}
                  type="number"
                  placeholder="Informe o valor do pagamento"
                  onChange={(event) => {
                    setValue(event.target.value.toUpperCase());
                  }}
                  value={value || ""}
                  step="0.01"
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
