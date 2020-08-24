import React from "react";
import { CardBody, Badge } from "reactstrap";

import Table from "../../../../../../../../components/Table";
import CardHeader from "../../../../../../../../components/CardHeader";
import DeleteButton from "../../../../../../../../components/ActionButtons/DeleteButton";

// import { Container } from './styles';

function TableEvents({ handleDeleteEventAction, matchDetails }) {
  return (
    <>
      <CardHeader title="EVENTOS" style={{ marginTop: 25 }} />
      <CardBody>
        <hr style={{ borderColor: "white" }} />
        <Table
          isLoading={false}
          data={{ data: matchDetails.MatchEvents }}
          columns={[
            { name: "Jogador", attribute: "User.name" },
            {
              name: "Time",
              render: ({ data }) => {
                if (
                  data.MatchEscalation &&
                  data.MatchEscalation.team === "TIME A"
                ) {
                  return data.Match.team_a;
                } else if (
                  data.MatchEscalation &&
                  data.MatchEscalation.team === "TIME B"
                ) {
                  return data.Match.team_b;
                }
              }
            },
            { name: "Evento", attribute: "description" },
            {
              name: "Pontos",
              render: ({ data }) => (
                <Badge
                  style={{ marginLeft: 15 }}
                  className={`event-value-badge ${
                    data.value > 0 ? "green" : "red"
                  }`}
                >
                  {`${data.value > 0 ? "+" : ""}`}
                  {data.value}
                </Badge>
              )
            },
            {
              name: <b className="action-column">Acões</b>,
              render: ({ data }) => (
                <ActionColumn
                  data={data}
                  handleDeleteEventAction={() =>
                    handleDeleteEventAction(data.id)
                  }
                />
              )
            }
          ]}
        />
      </CardBody>
    </>
  );
}

const ActionColumn = ({ handleDeleteEventAction }) => (
  <div className="action-column">
    <DeleteButton onClick={handleDeleteEventAction} />
  </div>
);

export default TableEvents;
