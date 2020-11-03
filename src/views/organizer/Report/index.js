import React from "react";

import "./styles.css";
import RelatorioArtilharia from "./RelatorioArtilharia";
import RelatorioJogadores from "./RelatorioJogadores";
import RelatorioFinanceiro from "./RelatorioFinanceiro";
import RelatorioAniversario from "./RelatorioAniversario";
import RelatorioPontuacaoGeral from "./RelatorioPontuacaoGeral";
import RelatorioPontuacaoGeralPosicao from "./RelatorioPontuacaoGeralPosicao";

const Report = () => {
  return (
    <div className="content">
      <RelatorioPontuacaoGeral />
      <RelatorioPontuacaoGeralPosicao />
      <RelatorioArtilharia />
      <RelatorioJogadores />
      <RelatorioFinanceiro />
      <RelatorioAniversario />
    </div>
  );
};

export default Report;
