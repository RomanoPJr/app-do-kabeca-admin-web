import React from "react";
import { Button } from "reactstrap";

// import { Container } from './styles';

function BtnCancelar({ onClick, text }) {
  return (
    <Button className="btn-close-modal" onClick={onClick}>
      {text}
    </Button>
  );
}

export default BtnCancelar;
