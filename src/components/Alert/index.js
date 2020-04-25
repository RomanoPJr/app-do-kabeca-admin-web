import React, { useState, useEffect } from "react";
import { Alert as AlertComp } from "reactstrap";

const Alert = ({ text }) => {
  const [alertIsOpen, setAlertIsOpen] = useState(false);

  useEffect(() => {
    if (text !== "") {
      setAlertIsOpen(true);
      setTimeout(() => {
        setAlertIsOpen(false);
      }, 5000);
    }
  }, [text]);

  return (
    <AlertComp
      fade
      isOpen={alertIsOpen}
      color="warning"
      style={{ position: "absolute", right: 20, top: 20 }}
    >
      {text}
    </AlertComp>
  );
};

export default Alert;
