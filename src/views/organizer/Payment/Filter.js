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
import moment from 'moment'

function Filter({ filterMonth, setFilterMonth, filterYear, setFilterYear }) {
  const months = [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
  ]

  const currentMonth = moment().format('M')
  const currentYear = moment().format('YYYY')

  console.log(filterMonth)
  return (
    <Row>
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
                    {months.map((month, i) => {
                      let show = true
                      const value = String(i + 1)
                      if (parseInt(filterYear) === parseInt(currentYear) && i > parseInt(currentMonth - 1)) {
                        show = false
                      }
                      return show && <option key={`month-${i}`} value={value.padStart(2, "0")}>{month}</option>
                    })}
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
                    min={2019}
                    max={currentYear}
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
    </Row>
  );
}

export default Filter;