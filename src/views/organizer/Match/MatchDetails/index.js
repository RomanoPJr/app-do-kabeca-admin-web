import React, { useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Container from "../../../../components/Container";
import MatchActions from "../../../../store/match/match.actions";
import "../styles.css";
import { useState } from "react";
import { Card, CardBody, Nav, TabContent } from "reactstrap";
import TabHeader from "./SectionContainer/Tab/TabHeader";
import TabPane from "./SectionContainer/Tab/TabPane";

const MatchDetails = ({ match, matches, history, fetchByDate }) => {
  const [activeTab, setActiveTab] = useState("1ª PARTIDA");

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    if (match.params && match.params.date) {
      await fetchByDate(match.params.date);
    } else {
      history.replace("/organizer/matches");
    }
  };
  const data = moment(match.params.date).format("DD/MM/yyyy");
  return (
    <>
      <Container className="super-container" loading={matches.length === 0}>
        {matches.length > 0 && (
          <Card>
            <h3 style={{ margin: 0, padding: 15, alignSelf: "center" }}>
              PARTIDAS EM: {`${data}`}
            </h3>
            <CardBody>
              <Nav tabs>
                {matches.map((match, i) => {
                  return (
                    <TabHeader
                      key={`${i}-tab`}
                      match={`${i + 1}ª PARTIDA`}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  );
                })}
              </Nav>
              <TabContent activeTab={activeTab}>
                {matches.map((match, i) => {
                  return (
                    activeTab === `${i + 1}ª PARTIDA` && (
                      <TabPane
                        key={`${i}-pane`}
                        id={`${i + 1}ª PARTIDA`}
                        match={match}
                      />
                    )
                  );
                })}
              </TabContent>
            </CardBody>
          </Card>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  matches: state.match.list
});

const mapDispatchToProps = dispatch => ({
  fetchByDate: date => MatchActions.fetchByDate(date)
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetails);
