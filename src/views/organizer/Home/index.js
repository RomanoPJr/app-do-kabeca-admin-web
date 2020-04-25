import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, CardHeader, CardTitle } from "reactstrap";

import "./styles.css";
import Content from "./Content";
import EmptyState from "./EmptyState";

import ClubActions from "../../../store/club/club.actions";

const Home = ({ club }) => {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="card-header-with-button">
              <CardTitle tag="h4">Home</CardTitle>
            </CardHeader>
            <CardBody>
              {club.data ? <Content list={club} /> : <EmptyState />}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  club: state.club,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAction: (payload) => dispatch(ClubActions.fetch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
