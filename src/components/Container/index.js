import React from "react";
import { Card, Col, Row } from "reactstrap";
import { ToastContainer } from "react-toastify";

import LoadingScreen from "../LoadingScreen";

export default function Container({ loading, children, className }) {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className={className}>
            {loading ? <LoadingScreen /> : <>{children}</>}
          </Card>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
}
