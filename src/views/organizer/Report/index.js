import React from "react";
import { connect } from 'react-redux'

import "./styles.css";
import RelatorioArtilharia from "./RelatorioArtilharia";
import RelatorioJogadores from "./RelatorioJogadores";
import RelatorioFinanceiro from "./RelatorioFinanceiro";
import RelatorioAniversario from "./RelatorioAniversario";
import RelatorioPontuacaoGeral from "./RelatorioPontuacaoGeral";
import RelatorioPontuacaoGeralPosicao from "./RelatorioPontuacaoGeralPosicao";

const Report = ({ club }) => {
  return (
    <div className="content">
      <RelatorioPontuacaoGeral club={club} />
      <RelatorioPontuacaoGeralPosicao club={club} />
      <RelatorioArtilharia />
      <RelatorioJogadores />
      <RelatorioFinanceiro />
      <RelatorioAniversario />
    </div>
  );
};

const mapStateToProps = state => ({
  club: state.club.data
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
