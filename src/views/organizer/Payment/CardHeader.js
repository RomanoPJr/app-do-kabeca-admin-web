import React from 'react';
import { CardHeader, CardTitle } from "reactstrap";
import Switch from "react-switch";

function CustomCardHeader({ switchValue, handleSwicthChange }) {
  return (
    <CardHeader className="card-header-with-button">
      <CardTitle tag="h4">Financeiro</CardTitle>
      <div className="payment-switch-container">
        {switchValue ? "Peladeiros visualizam os pagamentos de todos" : "Peladeiros visualizam somente os próprios pagamentos"}
        <Switch
          className="payment-switch"
          checked={switchValue}
          onChange={(value) => {
            handleSwicthChange(value)
          }}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </div>
    </CardHeader>
  );
}

export default CustomCardHeader;