import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  CardTitle,
  CardHeader,
} from "reactstrap";
import {
  FaUserMinus,
  FaDollarSign,
  FaHandHoldingUsd,
} from "react-icons/fa";

import { formatMoney } from "../../../utils/Currency";


function Counters({ totalizers }) {

  const [totalReceivable, setTotalReceivable] = useState(0)
  const [totalReceived, setTotalReceived] = useState(0)
  const [totalDue, setTotalDue] = useState(0)

  useEffect(() => {
    if (totalizers) {
      setTotalReceivable(formatMoney(totalizers.totalReceivable))
      setTotalReceived(formatMoney(totalizers.totalReceived))
      setTotalDue(formatMoney(totalizers.totalDue))
    }
  }, [totalizers])

  return (
    <Row>
      <Col lg="4">
        <Card className="card-chart">
          <CardHeader>
            <h5 className="card-category">Total a Receber</h5>
            <CardTitle tag="h3">
              <FaDollarSign style={{ marginRight: 15 }} />
              {totalReceivable}
            </CardTitle>
          </CardHeader>
        </Card>
      </Col>
      <Col lg="4">
        <Card className="card-chart">
          <CardHeader>
            <h5 className="card-category">Total Recebido</h5>
            <CardTitle tag="h3">
              <FaHandHoldingUsd style={{ marginRight: 15 }} />
              {totalReceived}
            </CardTitle>
          </CardHeader>
        </Card>
      </Col>
      <Col lg="4">
        <Card className="card-chart">
          <CardHeader>
            <h5 className="card-category">Total em Pendência</h5>
            <CardTitle tag="h3" style={{ color: "red" }}>
              <FaUserMinus style={{ marginRight: 15 }} />
              {totalDue}
            </CardTitle>
          </CardHeader>
        </Card>
      </Col>
    </Row>
  )
}

export default Counters;