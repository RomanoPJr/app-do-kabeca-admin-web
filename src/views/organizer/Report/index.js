import React from "react";

import "./styles.css";
import RelatorioArtilharia from "./RelatorioArtilharia";
import RelatorioJogadores from "./RelatorioJogadores";
import RelatorioFinanceiro from "./RelatorioFinanceiro";

const Report = () => {
  return (
    <div className="content">
      <RelatorioArtilharia />
      <RelatorioJogadores />
      <RelatorioFinanceiro />
    </div>
  );
};

export default Report;
