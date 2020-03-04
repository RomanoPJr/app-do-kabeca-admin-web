import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Alert,
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
import { createSessionAction } from "../../store/session/session.actions.js";

const handleSubmitForm = (createSession, form, evt) => {
  createSession(form);
  evt.preventDefault();
};

const SignIn = ({ createSession, session, sessionError }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertText, setAlertText] = useState("Erro");

  useEffect(() => {
    if (session.id) {
      history.push("/");
    } else if (sessionError !== "") {
      setAlertText("Email ou senha inválidos.");
      setAlertIsOpen(true);
      setTimeout(() => {
        setAlertIsOpen(false);
      }, 5000);
    }
  }, [session]);
  return (
    <div className="content">
      <Alert
        isOpen={alertIsOpen}
        color="warning"
        fade
        style={{ position: "absolute", right: 20, top: 20 }}
      >
        {alertText}
      </Alert>
      <Row className="signIn-container">
        <Col md="4">
          <Card>
            <CardHeader>
              <h2>Login</h2>
            </CardHeader>
            <Form
              onSubmit={evt =>
                handleSubmitForm(createSession, { email, password }, evt)
              }
            >
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>E-mail</label>
                      <Input
                        required={true}
                        placeholder="Qual seu E-mail?"
                        type="email"
                        onChange={event => setEmail(event.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label>Senha</label>
                      <Input
                        required
                        placeholder="Digite sua Senha..."
                        type="password"
                        onChange={event => setPassword(event.target.value)}
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
                  // onClick={evt =>
                  //   handleSubmitForm(createSession, { email, password }, evt)
                  // }
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
  session: state.session.data,
  sessionError: state.session.error
});
const mapDispatchToProps = dispatch => ({
  createSession: payload => dispatch(createSessionAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
