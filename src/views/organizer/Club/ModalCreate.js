import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row, Input } from "reactstrap";

import Modal from "../../../components/Modal";
import UploadInput from "../../../components/UploadInput";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ModalCreate = ({
  data,
  opened,
  loading,
  setOpened,
  confirmAction,
  fetchUFS,
  fetchCities,
  ufs,
  cities,
  ufs_loading
}) => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [time, setTime] = useState();
  const [state, setState] = useState();
  const [logo_url, setLogoUrl] = useState("");
  const [day, setDay] = useState("SEGUNDA-FEIRA");
  const [payment_module_view_type, setPaymentModuleViewType] = useState("ALL");

  useEffect(() => {
    fetchUFS();
  }, []);

  useEffect(() => {
    if (data) {
      setId(data.id);
      setDay(data.day);
      setName(data.name);
      setCity(data.city);
      setTime(data.time);
      setState(data.state);
      setLogoUrl(data.logo_url);
      setPaymentModuleViewType(data.payment_module_view_type);
    }
  }, [data]);

  useEffect(() => {
    if (state) {
      const selectedState = ufs.find(uf => uf.nome.toUpperCase() === state);
      if (selectedState) {
        fetchCities(selectedState.sigla);
        // setCity()
      }
    }
  }, [state, ufs]);

  useEffect(() => {
    if (state && data && state !== data.state) {
      if (cities.length > 0) {
        setCity(cities[0].nome.toUpperCase());
      }
    }
  }, [cities]);

  return (
    <>
      {opened && (
        <Modal
          className="modal fade"
          title="Clube"
          opened={opened}
          setOpened={setOpened}
        >
          <Form
            onSubmit={evt =>
              confirmAction(evt, {
                id,
                day,
                name,
                city,
                time,
                state,
                logo_url,
                payment_module_view_type
              })
            }
          >
            <Row>
              <Col md="12">
                <label>Nome</label>
                <Input
                  type="text"
                  required={true}
                  value={name || ""}
                  placeholder="Informe o nome"
                  onChange={event => {
                    setName(event.target.value.toUpperCase());
                  }}
                />
              </Col>
              <Col md="6">
                <label>Dia da pelada</label>
                <select
                  value={day || "SEGUNDA-FEIRA"}
                  name="select"
                  className="form-control"
                  onChange={event => setDay(event.target.value.toUpperCase())}
                >
                  <option value="SEGUNDA-FEIRA">SEGUNDA-FEIRA</option>
                  <option value="TERCA-FEIRA">TERÇA-FEIRA</option>
                  <option value="QUARTA-FEIRA">QUARTA-FEIRA</option>
                  <option value="QUINTA-FEIRA">QUINTA-FEIRA</option>
                  <option value="SEXTA-FEIRA">SEXTA-FEIRA</option>
                  <option value="SÁBADO">SÁBADO</option>
                  <option value="DOMINGO">DOMINGO</option>
                </select>
              </Col>
              <Col md="6">
                <label>Horário da Pelada</label>
                <Input
                  required
                  type="time"
                  value={time || ""}
                  placeholder="Informe o horário"
                  onChange={event => setTime(event.target.value.toUpperCase())}
                />
              </Col>
              <Col md="6">
                <label>Estado</label>
                <select
                  value={state}
                  name="select"
                  className="form-control"
                  onChange={event => {
                    setState(event.target.value.toUpperCase());
                  }}
                >
                  {ufs &&
                    ufs.map(uf => (
                      <option key={uf.id} value={uf.nome.toUpperCase()}>
                        {uf.nome.toUpperCase()}
                      </option>
                    ))}
                </select>
              </Col>
              <Col md="6">
                <label>Cidade</label>
                <select
                  disabled={ufs.length === 0 || ufs_loading}
                  value={city}
                  name="select"
                  className="form-control"
                  onChange={event => {
                    setCity(event.target.value.toUpperCase());
                  }}
                >
                  {cities &&
                    cities.map(city => (
                      <option key={city.id} value={city.nome.toUpperCase()}>
                        {city.nome.toUpperCase()}
                      </option>
                    ))}
                </select>
              </Col>
              <Col md="12" style={{ display: "flex", flexDirection: "column" }}>
                <label>
                  Logotipo da Pelada (Tamanho Recomendado: 512px x 512px)
                </label>
                <UploadInput
                  text="Upload"
                  onLoad={base64 => {
                    setLogoUrl(base64);
                  }}
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
