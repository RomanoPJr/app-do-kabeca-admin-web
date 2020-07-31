import React from "react";
import { FaPlus } from "react-icons/fa";
import { Button, CardHeader as Header, CardTitle } from "reactstrap";

const CardHeader = ({ setModalCreateOpened, title, btnText, btnIcon }) => {
  return (
    <Header className="card-header-with-button">
      <CardTitle tag="h4">{title}</CardTitle>
      <div>
        {setModalCreateOpened && (
          <Button
            className="btn-fill btn btn-info"
            onClick={() => setModalCreateOpened(true)}
          >
            {btnIcon || <FaPlus />}
            {btnText || "NOVO"}
          </Button>
        )}
      </div>
    </Header>
  );
};

export default CardHeader;
