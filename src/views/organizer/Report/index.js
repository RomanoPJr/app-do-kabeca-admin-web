import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'

import "./styles.css";
import RelatorioArtilharia from "./RelatorioArtilharia";
import RelatorioJogadores from "./RelatorioJogadores";
import RelatorioAniversario from "./RelatorioAniversario";
import RelatorioPontuacaoGeral from "./RelatorioPontuacaoGeral";
import SeasonActions from "../../../store/season/season.actions";
import RelatorioPontuacaoGeralPosicao from "./RelatorioPontuacaoGeralPosicao";

const Report = ({ fetchSeasons, season, club }) => {

  useEffect(() => {
    fetchSeasons()
  }, [])

  return (
    <div className="content">
      <RelatorioPontuacaoGeral club={club} season={season} />
      <RelatorioPontuacaoGeralPosicao club={club} season={season} />
      <RelatorioArtilharia season={season} />
      <RelatorioJogadores season={season} />
      <RelatorioAniversario season={season} />
    </div>
  );
};

const mapStateToProps = state => ({
  club: state.club.data,
  season: state.season.data.data
});

const mapDispatchToProps = dispatch => ({
  fetchSeasons: () => dispatch(SeasonActions.fetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
