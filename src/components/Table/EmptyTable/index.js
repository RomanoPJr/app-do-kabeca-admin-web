import React from "react";
import { FaInbox, FaSpinner } from "react-icons/fa";

import styles from "./styles";

function EmptyTable({ isLoading }) {
  return (
    <div style={styles.EmptyTableContainer}>
      {isLoading ? (
        <>
          <FaSpinner size={40} color="white" className="loading" />
        </>
      ) : (
        <>
          <FaInbox size={40} color="white" />
          <h4 style={styles.EmptyTableText}>Nenhum resgistro encontrado...</h4>
        </>
      )}
    </div>
  );
}

export default EmptyTable;
