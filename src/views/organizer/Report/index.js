import React from "react";

import "./styles.css";
import RelatorioArtilharia from "./RelatorioArtilharia";
import RelatorioJogadores from "./RelatorioJogadores";
import RelatorioFinanceiro from "./RelatorioFinanceiro";
import RelatorioAniversario from "./RelatorioAniversario";
import RelatorioPontuacaoGeral from "./RelatorioPontuacaoGeral";

const Report = () => {
  return (
    <div className="content">
      <RelatorioArtilharia />
      <RelatorioJogadores />
      <RelatorioFinanceiro />
      <RelatorioAniversario />
      <RelatorioPontuacaoGeral />
    </div>
  );
};

export default Report;
