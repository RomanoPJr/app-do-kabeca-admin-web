import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import Table from "../components/Table";
import { adminListAll } from "../store/admin/admin.actions";
const admins = [
  {
    name: "Teste",
    email: "caio.deambrosio@gmail.com",
    phone: "(27) 99508-2289"
  },
  {
    name: "Teste",
    email: "caio.deambrosio@gmail.com",
    phone: "(27) 99508-2289"
  }
];

const Admins = ({ fetchAdmins }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  useEffect(() => {
    fetchAdmins({ pageNumber, pageSize });
  }, [pageNumber]);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Administradores</CardTitle>
              </CardHeader>
              <CardBody>
                <Table
                  columns={[
                    { name: "Nome", attribute: "name" },
                    { name: "E-mail", attribute: "email" },
                    { name: "Telefone", attribute: "phone" }
                  ]}
                  data={admins}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchAdmins: payload => dispatch(adminListAll(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
