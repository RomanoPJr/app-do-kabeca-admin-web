import React from "react";
import { Form as FormRS } from "reactstrap";

function Form({ children, onSubmit }) {
  const handleSubmit = evt => {
    evt.preventDefault();

    const form = {};
    Array([...evt.target.elements])[0].map(element => {
      if (element.id) {
        form[element.id] = element.value;
      }
    });
    onSubmit(form);
  };
  return <FormRS onSubmit={handleSubmit}>{children}</FormRS>;
}

export default Form;
