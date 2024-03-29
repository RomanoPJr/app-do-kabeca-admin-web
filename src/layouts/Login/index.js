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
import { FaRunning, FaUserShield } from "react-icons/fa";
import './styles.css'

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
                    <label>Email ou Telefone</label>
                    <Input
                      required={true}
                      placeholder="Informe seu email ou telefone"
                      type="text"
                      onChange={event => {
                        setEmail(event.target.value.toUpperCase());
                      }}
                      value={email || ""}
                    />
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
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
                <h5>Não possui senha?</h5>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: 25, height: 25}}>
                <a href="/criar-senha">
                  <h5 className="criar-senha-link" >
                    <FaRunning size={18} style={{marginRight: 6}}/>
                    sou JOGADOR
                  </h5>
                </a>
                <a href="/sign-in">
                  <h5 className="criar-senha-link" >
                    <FaUserShield size={18} style={{marginRight: 6}}/>
                    sou ORGANIZADOR
                  </h5>
                </a>
                </div>
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
