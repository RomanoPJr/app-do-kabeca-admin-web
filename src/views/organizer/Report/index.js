import React from "react";

import "./styles.css";
import RelatorioArtilharia from "./RelatorioArtilharia";
import RelatorioJogadores from "./RelatorioJogadores";
import RelatorioFinanceiro from "./RelatorioFinanceiro";
import RelatorioAniversario from "./RelatorioAniversario";

const Report = () => {
  return (
    <div className="content">
      <RelatorioArtilharia />
      <RelatorioJogadores />
      <RelatorioFinanceiro />
      <RelatorioAniversario />
    </div>
  );
};

export default Report;
