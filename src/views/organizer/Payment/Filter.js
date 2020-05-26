import React from "react";
import {
  Col,
  Row,
  Card,
  Input,
  Label,
  CardBody,
  FormGroup,
  CardHeader,
} from "reactstrap";

function Filter({ filterMonth, setFilterMonth, filterYear, setFilterYear }) {
  return <Row>
    <Col lg="12">
      <Card>
        <CardHeader>
          <h5 className="card-category">Filtros</h5>
        </CardHeader>
        <CardBody>
          <Row style={{ alignItems: "baseline" }}>
            <Col lg="6">
              <FormGroup>
                <Label>Mês</Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect1"
                  placeholder="Mês"
                  value={filterMonth || ""}
                  onChange={(event) => {
                    setFilterMonth(event.target.value);
                  }}
                >
                  <option value="01">JANEIRO</option>
                  <option value="02">FEVEREIRO</option>
                  <option value="03">MARÇO</option>
                  <option value="04">ABRIL</option>
                  <option value="05">MAIO</option>
                  <option value="06">JUNHO</option>
                  <option value="07">JULHO</option>
                  <option value="08">AGOSTO</option>
                  <option value="09">SETEMBRO</option>
                  <option value="10">OUTUBRO</option>
                  <option value="11">NOVEMBRO</option>
                  <option value="12">DEZEMBRO</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <Label>Ano</Label>
                <Input
                  required
                  value={filterYear || ""}
                  placeholder="Ano"
                  type="number"
                  min="2020"
                  onChange={(event) => {
                    setFilterYear(event.target.value);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  </Row>;
}

export default Filter;