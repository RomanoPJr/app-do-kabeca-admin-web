import React from "react";
import { FaEdit, FaCopy, FaTrash, FaAlignJustify } from "react-icons/fa";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

export default ({
  setModalDeleteMatchOpened,
  setModalCloneOpened,
  setModalCreateOpened
}) => {
  return (
    <div className="step-three-container" style={{ marginBottom: 35 }}>
      <UncontrolledDropdown>
        <DropdownToggle
          caret
          data-toggle="dropdown"
          className="btn-match-actions"
        >
          <FaAlignJustify />
          AÇÕES
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            className="dropMatchItem"
            onClick={() => setModalCreateOpened(true)}
          >
            <FaEdit />
            {` EDITAR`}
          </DropdownItem>
          <DropdownItem
            className="dropMatchItem"
            onClick={() => setModalCloneOpened(true)}
          >
            <FaCopy />
            {` CLONAR`}
          </DropdownItem>
          <DropdownItem
            className="dropMatchItem"
            onClick={() => setModalDeleteMatchOpened(true)}
          >
            <FaTrash />
            {` DELETAR`}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};
