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
  Row,
} from "reactstrap";

import history from "../../history";
import Alert from "../../components/Alert";
import { formatPhone } from "../../utils/Phone";
import OrganizerActions from "../../store/organizer/organizer.actions.js";

const SignIn = ({ organizer, createOrganizer }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [birth_date, setBirthDate] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    if (organizer.data && organizer.data.name) {
      history.push("/login");
    }
  }, [organizer]);

  const handleSubmitForm = (evt) => {
    createOrganizer({
      name,
      email,
      password,
      birth_date,
      confirmPassword,
      phone: phone.replace(/\D/g, ""),
    });
    evt.preventDefault();
  };

  return (
    <div className="content">
      <Alert text={organizer.error} />
      <Row className="signIn-container">
        <Col md="6">
          <Card>
            <CardHeader>
              <h2>Faça Seu Cadastro</h2>
            </CardHeader>
            <Form onSubmit={handleSubmitForm}>
              <CardBody>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Nome</label>
                      <Input
                        type="text"
                        required={true}
                        placeholder="Qual seu nome?"
                        onChange={(event) =>
                          setName(event.target.value.toUpperCase())
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>E-mail</label>
                      <Input
                        type="email"
                        required={true}
                        placeholder="Qual seu E-mail?"
                        onChange={(event) =>
                          setEmail(event.target.value.toUpperCase())
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Telefone</label>
                      <Input
                        value={phone}
                        maxLength="15"
                        required={true}
                        placeholder="Qual seu Telefone"
                        onChange={(event) => {
                          setPhone(formatPhone(event.target.value));
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Data de Nascimento</label>
                      <Input
                        type="date"
                        required={true}
                        placeholder="Qual sua data de Nascimento?"
                        onChange={(event) =>
                          setBirthDate(event.target.value.toUpperCase())
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Senha</label>
                      <Input
                        required
                        placeholder="Digite sua Senha..."
                        type="password"
                        onChange={(event) =>
                          setPassword(event.target.value.toUpperCase())
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Confirmar Senha</label>
                      <Input
                        required
                        type="password"
                        placeholder="Confirme sua Senha..."
                        onChange={(event) =>
                          setConfirmPassword(event.target.value.toUpperCase())
                        }
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

const mapStateToProps = (state) => ({
  organizer: state.organizer,
});
const mapDispatchToProps = (dispatch) => ({
  createOrganizer: (payload) => dispatch(OrganizerActions.create(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
