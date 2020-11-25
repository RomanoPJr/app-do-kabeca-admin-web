import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row
} from "reactstrap";

import history from "../../history";
import Alert from "../../components/Alert";
import SessionActions from "../../store/session/session.actions.js";

const Login = ({ session, createSession }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const userType = localStorage.getItem("@APPDOKABECA:user_type");
    if (userType) {
      if (userType === "ADMIN") {
        history.push(`/admins`);
      }else{
        history.push(`/club`);
      }
    }
  }, [localStorage.getItem("@APPDOKABECA:user_type")]);

  const handleSubmitForm = evt => {
    createSession({ email, password });
    evt.preventDefault();
  };

  return (
    <div className="content">
      <Alert text={session.error} />
      <Row className="signIn-container">
        <Col md="4">
          <Card>
            <CardHeader>
              <h2>Login</h2>
            </CardHeader>
            <Form onSubmit={handleSubmitForm}>
              <CardBody>
                <Row>
                  <Col md="12">
                    {/* <FormGroup> */}
                    <label>E-mail</label>
                    <Input
                      required={true}
                      placeholder="Qual seu E-mail?"
                      type="text"
                      onChange={event => {
                        setEmail(event.target.value.toUpperCase());
                      }}
                      value={email || ""}
                    />
                    {/* </FormGroup> */}
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label>Senha</label>
                      <Input
                        required
                        placeholder="Digite sua Senha..."
                        type="password"
                        value={password || ""}
                        onChange={event => {
                          setPassword(event.target.value.toUpperCase());
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill btn-block"
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.session
});
const mapDispatchToProps = dispatch => ({
  createSession: payload => dispatch(SessionActions.create(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
