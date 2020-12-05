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
import { formatPhone } from "../../utils/Phone";
import SessionActions from "../../store/session/session.actions.js";
import { toast, ToastContainer } from "react-toastify";

const Login = ({ session, createPassword }) => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

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

  const handleSubmitForm = async evt => {
    evt.preventDefault();
    
    const {data, success, error} = await SessionActions.createPassword({ 
      phone: phone.replace(/\D/g, ""), 
      password, 
      confirmPassword 
    });


    if(success === false){
      return toast.error(error);
    }else{
      toast.success('Senha criada com sucesso, faça o login.');
      window.location.href = '/login'
    }
  };

  return (
    <div className="content">
      <Alert text={session.error} />
      <Row className="signIn-container">
        <Col md="4">
          <Card>
            <CardHeader>
              <h2>Criar senha</h2>
            </CardHeader>
            <Form onSubmit={handleSubmitForm}>
              <CardBody>
                <Row>
                  <Col md="12">
                    <label>Telefone</label>
                    <Input
                      type="text"
                      value={phone || ""}
                      maxLength="15"
                      required={true}
                      placeholder="Informe o telefone"
                      onChange={event => {
                        setPhone(formatPhone(event));
                      }}
                    />
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label>Senha</label>
                      <Input
                        required
                        placeholder="Digite sua senha..."
                        type="password"
                        value={password || ""}
                        onChange={event => {
                          setPassword(event.target.value.toUpperCase());
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label>Confirmar Senha</label>
                      <Input
                        required
                        placeholder="Confirme sua senha..."
                        type="password"
                        value={confirmPassword || ""}
                        onChange={event => {
                          setConfirmPassword(event.target.value.toUpperCase());
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
                  Criar senha 
                </Button>
              </CardFooter>
            </Form>
            <div 
              style={{
                display: 'flex', 
                justifyContent: 'space-around', 
                alignItems: 'center',
                marginTop: 10, 
                marginBottom: 10, 
                height: 25
              }}
            >
              <a href="/login">
                <h5 className="criar-senha-link" >
                  Login
                </h5>
              </a>
            </div>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.session
});
export default connect(mapStateToProps, null)(Login);
