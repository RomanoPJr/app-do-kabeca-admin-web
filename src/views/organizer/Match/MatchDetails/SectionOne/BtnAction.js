import React from "react";
import { FaAlignJustify, FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

function SectionOne({
  setModalCreateOpened,
  setModalCloneOpened,
  setModalDeleteMatchOpened
}) {
  return (
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
  );
}

export default SectionOne;
